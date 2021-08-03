import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import MultiRangeSliderCss from "./MultiRangeSlider.module.css";

const MultiRangeSlider = ({ min, max, onChange, currentPriceFilter }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [localMaxVal, setLocalMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const left_input = useRef(null);
  const right_input = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);
    //const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Set width of the range to decrease from the right side
  // useEffect(() => {
  //   const minPercent = getPercent(minValRef.current);
  //   const maxPercent = getPercent(maxVal);
  //   console.log("MIN ", minPercent);
  //   console.log("minVal ", minVal);
  //   if (range.current) {
  //     range.current.style.width = `${maxPercent - minPercent}%`;
  //   }
  // }, [minVal, maxVal, getPercent]);

  // Get min and max values when their state changes

  const stringToInteger = (string) => {
    const removeLetters = string.replace(/[^0-9]/g, "");
    const removeFirstZero = removeLetters.replace(/^0(.+)/, "$1");
    if (removeFirstZero === "") return 0;
    return parseInt(removeFirstZero);
  };
  const handleMouseUp = (minVal, maxVal) => {
    onChange({ min: minVal, max: maxVal });
  };

  const handleMinChange = (e) => {
    if (e.target.value === "") {
      setMinVal(0);
    } else {
      const number = stringToInteger(e.target.value);
      const lowerBoundNumber = number <= min ? min : number;
      const upperBoundNumber =
        lowerBoundNumber >= maxVal ? maxVal - 1 : lowerBoundNumber;
      setMinVal(parseInt(upperBoundNumber));
    }
  };

  const handleMaxChange = (e) => {
    if (e.target.value === "") {
      setLocalMaxVal(0);
    } else {
      const number = stringToInteger(e.target.value);

      const upperBoundNumber = number >= max ? max : number;
      // const lowerBoundNumber =
      //   upperBoundNumber <= minVal ? minVal + 1 : upperBoundNumber;
      setLocalMaxVal(parseInt(upperBoundNumber));
    }
  };

  useEffect(() => {
    if (localMaxVal >= minVal && localMaxVal <= max && localMaxVal !== maxVal) {
      setMaxVal(localMaxVal);
    }
  }, [localMaxVal, minVal, maxVal]);
  useEffect(() => {
    if (maxVal === max) setLocalMaxVal(maxVal);
  }, [maxVal]);

  const setAcceptedMaxValue = (localMaxVal, maxVal, minVal) => {
    if (localMaxVal <= minVal) setMaxVal(minVal + 1);
    else if (localMaxVal > max) setMaxVal(max);
    else setMaxVal(localMaxVal);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      onChange({ min: minVal, max: maxVal });
    }, 400);
    return () => {
      clearTimeout(timeId);
    };
  }, [minVal, maxVal]);

  useEffect(() => {
    setMinVal(currentPriceFilter.min);
    setMaxVal(currentPriceFilter.max);
  }, [currentPriceFilter]);

  return (
    <div>
      <p className={MultiRangeSliderCss.header}>Price</p>
      <div className={MultiRangeSliderCss.container}>
        <input
          type="range"
          ref={left_input}
          min={min}
          max={max}
          value={minVal}
          onMouseUp={() => handleMouseUp(minVal, maxVal)}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={`${MultiRangeSliderCss.thumb} ${MultiRangeSliderCss.thumb_left}`}
        />
        <input
          type="range"
          ref={right_input}
          min={min}
          max={max}
          value={maxVal}
          onMouseUp={() => handleMouseUp(minVal, maxVal)}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setLocalMaxVal(value);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={`${MultiRangeSliderCss.thumb} ${MultiRangeSliderCss.thumb_right}`}
        />

        <div className={MultiRangeSliderCss.slider}>
          <div className={MultiRangeSliderCss.slider_track}></div>
          <div ref={range} className={MultiRangeSliderCss.slider_range}></div>
        </div>
      </div>
      <div style={{ marginTop: "14px" }}>
        <input
          className={MultiRangeSliderCss.text_input}
          onChange={handleMinChange}
          value={minVal}
        />
        <p
          style={{
            display: "inline-block",
          }}
        >
          -
        </p>
        <input
          onBlur={() => setAcceptedMaxValue(localMaxVal, maxVal, minVal)}
          className={MultiRangeSliderCss.text_input}
          onChange={handleMaxChange}
          value={localMaxVal}
        />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
