import { useState, useRef } from "react";

import SidePanelFiltersCss from "./SidePanelFiltersCss.module.css";
import MultiRangeSlider from "./MultiRangeSlider";

const SidePanelFilters = ({ setPricesToFilter, setTypesToFilter }) => {
  const [typeFilters, setTypeFilters] = useState([""]);
  return (
    <div className={SidePanelFiltersCss.main_container}>
      <MultiRangeSlider
        min={0}
        max={2500}
        //onChange={({ min, max }) => setPriceFilters({ min, max })}
        onChange={({ min, max }) => {
          console.log("CHANGED");
          setPricesToFilter({ min, max });
        }}
      />
    </div>
  );
};

export default SidePanelFilters;
