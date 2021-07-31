import { useState } from "react";
import "./ListOfFilters.css";
import { RiArrowDropDownLine } from "react-icons/ri";

import { useDetectClickOutside } from "react-detect-click-outside";

const DropDown = ({ items, defaultSelected, handleNewItem, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentlySelected, setCurrentlySelected] = useState(
    defaultSelected ?? ""
  );

  const selectItem = (item) => {
    handleNewItem(item);
    setCurrentlySelected(item);
    setIsOpen(false);
  };
  const formatText = () => {
    if (type === "page") return currentlySelected.label + " per page";
    else if (type === "sorting") return "sorting by " + currentlySelected.label;
  };

  const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });

  return (
    <div className="main_dropdown_container_dropdown" ref={ref}>
      <div
        className="header_dropdown"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {formatText()}
          <RiArrowDropDownLine size={20} />
        </div>
      </div>
      {isOpen && (
        <div className="dropdownlist_dropdown">
          {items.map((item) => (
            <div
              className="dropdownitem_dropdown"
              onClick={() => selectItem(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
