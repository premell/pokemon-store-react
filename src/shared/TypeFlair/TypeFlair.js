import getFlairColor from "./getFlairColor";

import TypeFlairCss from "./TypeFlair.module.css";
const TypeFlair = ({ type }) => {
  const color = getFlairColor(type);
  return (
    <div
      className={TypeFlairCss.main_container}
      style={{ backgroundColor: color }}
    >
      {type}
    </div>
  );
};

export default TypeFlair;
