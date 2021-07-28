import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import MultiRangeSliderCss from "./MultiRangeSlider.module.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
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
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes

  const stringToInteger = (string) => {
    const removeLetters = string.replace(/[^0-9]/g, "");
    const removeFirstZero = removeLetters.replace(/^0/, "");
    return removeFirstZero;
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
      setMaxVal(0);
    } else {
      const number = stringToInteger(e.target.value);
      const upperBoundNumber = number >= max ? max : number;
      const lowerBoundNumber =
        upperBoundNumber <= minVal ? minVal + 1 : upperBoundNumber;
      setMaxVal(parseInt(lowerBoundNumber));
    }
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      onChange({ min: minVal, max: maxVal });
    }, 400);
    return () => {
      clearTimeout(timeId);
    };
  }, [minVal, maxVal]);

  return (
    <div>
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
      <input onChange={handleMinChange} value={minVal} />
      <input onChange={handleMaxChange} value={maxVal} />
    </div>
  );
};

export default MultiRangeSlider;
