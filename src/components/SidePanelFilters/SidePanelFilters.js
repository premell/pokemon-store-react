import { memo, useRef, useState, useEffect } from "react";

import MultiRangeSlider from "./MultiRangeSlider";
import SidePanelFiltersCss from "./SidePanelFiltersCss.module.css";
import TypeFilterList from "./TypeFilterList";

const SidePanelFilters = ({ setPricesToFilter, setTypesToFilter }) => {
  const [typeFilters, setTypeFilters] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const handleTypeClick = (e) => {
    const newType = e.target.id;
    if (e.target.checked === true) {
      setTypeFilters([...typeFilters, newType]);
    } else {
      const removedChecked = typeFilters.filter((type) => type !== newType);
      setTypeFilters(removedChecked);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    setTypesToFilter(typeFilters);
  }, [typeFilters, initialLoad]);

  return (
    <div className={SidePanelFiltersCss.main_container}>
      <MultiRangeSlider
        min={0}
        max={2500}
        //onChange={({ min, max }) => setPriceFilters({ min, max })}
        onChange={({ min, max }) => {
          setPricesToFilter({ min, max });
        }}
      />
      <TypeFilterList handleClick={handleTypeClick} />
    </div>
  );
};

export default memo(SidePanelFilters);
