import { memo, useEffect, useRef, useState, useCallback } from "react";

import MultiRangeSlider from "./MultiRangeSlider";
import SidePanelFiltersCss from "./SidePanelFiltersCss.module.css";
import TypeFilterList from "./TypeFilterList";

const SidePanelFilters = ({
  setPriceFilters,
  setTypeFilters,
  priceFilters,
  typeFilters,
}) => {
  const [initialLoad, setInitialLoad] = useState(true);

  const handleTypeClick = (e) => {
    const newType = e.target.id;
    if (e.target.checked === true) {
      //setLocalTypeFilters([...localTypeFilters, newType]);
      setTypeFilters([...typeFilters, newType]);
    } else {
      const removedChecked = typeFilters.filter((type) => type !== newType);
      setTypeFilters(removedChecked);
    }
  };

  return (
    <div className={SidePanelFiltersCss.main_container}>
      <MultiRangeSlider
        min={0}
        max={2500}
        //onChange={({ min, max }) => setPriceFilters({ min, max })}
        currentPriceFilter={priceFilters}
        onChange={({ min, max }) => {
          setPriceFilters({ min, max });
        }}
      />
      <TypeFilterList typeFilters={typeFilters} handleClick={handleTypeClick} />
    </div>
  );
};

export default SidePanelFilters;
