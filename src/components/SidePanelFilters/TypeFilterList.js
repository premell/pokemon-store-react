import { useEffect } from "react";

import TypeFlair from "../../shared/TypeFlair/TypeFlair";
import ALL_TYPES from "../../utils/ALL_TYPES";

import TypeFilterListCss from "./TypeFilterList.module.css";

const typeList = Object.values(ALL_TYPES);

const TypeFilterList = ({ handleClick }) => {
  return (
    <div>
      {typeList.map((type) => (
        <div class={TypeFilterListCss.flair_container}>
          <input
            type="checkbox"
            onClick={handleClick}
            id={type}
            class={TypeFilterListCss.check_box}
          />

          <TypeFlair type={type} />
        </div>
      ))}
    </div>
  );
};

export default TypeFilterList;
