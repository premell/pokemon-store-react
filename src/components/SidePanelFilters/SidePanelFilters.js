import { useState, useRef, memo } from "react";

import SidePanelFiltersCss from "./SidePanelFiltersCss.module.css";
import MultiRangeSlider from "./MultiRangeSlider";
import TypeFilterList from "./TypeFilterList";

const SidePanelFilters = ({ setPricesToFilter, setTypesToFilter }) => {
  const [typeFilters, setTypeFilters] = useState([""]);
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
      <TypeFilterList />
    </div>
  );
};

export default memo(SidePanelFilters);
