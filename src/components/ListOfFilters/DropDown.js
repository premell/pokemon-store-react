import { useState } from "react";
import "./ListOfFilters.css";

const DropDown = ({ items, defaultSelected, handleNewItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentlySelected, setCurrentlySelected] = useState(
    defaultSelected ?? ""
  );

  const selectItem = (item) => {
    handleNewItem(item);
    setCurrentlySelected(item);
    setIsOpen(false);
  };

  return (
    <div className="main_dropdown_container_dropdown">
      <div
        className="header_dropdown"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        sorting by {currentlySelected.label}
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
