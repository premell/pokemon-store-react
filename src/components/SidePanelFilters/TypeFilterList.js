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
            onClick={handleClick}
            id={type}
            className={TypeFilterListCss.test_check_box}
            defaultChecked={typeFilters?.includes(type)}
          />
          <p>{type}</p>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      {typeList.map((type) => (
        <div class={TypeFilterListCss.flair_container}>
          <input
            type="checkbox"
            onClick={handleClick}
            id={type}
            class={TypeFilterListCss.check_box}
            checked={typeFilters?.includes(type)}
          />
          <TypeFlair type={type} />
        </div>
      ))}
    </div>
  );
};

export default TypeFilterList;
