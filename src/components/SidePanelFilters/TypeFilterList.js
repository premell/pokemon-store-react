import { useEffect } from "react";

import TypeFlair from "../../shared/TypeFlair/TypeFlair";
import ALL_TYPES from "../../utils/ALL_TYPES";

import TypeFilterListCss from "./TypeFilterList.module.css";

const typeList = Object.values(ALL_TYPES);

const TypeFilterList = ({ handleClick, typeFilters }) => {
  return (
    <div>
      <p className={TypeFilterListCss.header}>Types</p>
      {typeList.map((type) => (
        <div key={type} className={TypeFilterListCss.flair_container}>
          <input
            type="checkbox"
            onChange={handleClick}
            id={type}
            className={TypeFilterListCss.test_check_box}
            checked={typeFilters?.includes(type)}
          />
          <p className={TypeFilterListCss.side_type}>{type}</p>
        </div>
      ))}
    </div>
  );
};

export default TypeFilterList;
