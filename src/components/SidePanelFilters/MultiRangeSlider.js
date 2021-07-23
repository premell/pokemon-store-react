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

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
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
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const stringToInteger = (string) => {
    const removeLetters = string.replace(/[^0-9]/g, "");
    const removeFirstZero = removeLetters.replace(/^0/, "");
    return removeFirstZero;
  };

  const handleMinChange = (e) => {
    const number = stringToInteger(e.target.value);
    const constrainedNumber =
      number <= minValRef.current ? minValRef.current : number;
    setMinVal(constrainedNumber);
  };
  const handleMaxChange = (e) => {
    const number = stringToInteger(e.target.value);
    const constrainedNumber =
      number >= maxValRef.current ? maxValRef.current : number;
    setMinVal(constrainedNumber);
  };

  useEffect(() => {
    console.log("RERENDERED");
  });

  return (
    <div>
      <div className={MultiRangeSliderCss.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={`${MultiRangeSliderCss.thumb} ${MultiRangeSliderCss.thumb_left}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
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
          <div className={MultiRangeSliderCss.slider_left_value}>{minVal}</div>
          <div className={MultiRangeSliderCss.slider_right_value}>{maxVal}</div>
        </div>
      </div>
      <input onChange={handleMinChange} value={minVal} />
      <input onChange={handleMaxChange} value={maxVal} />
    </div>
  );
};

export default MultiRangeSlider;
