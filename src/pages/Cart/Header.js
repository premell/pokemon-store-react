import "./Cart.css";

import { VscArrowSmallDown } from "react-icons/vsc";
import { VscArrowSmallUp } from "react-icons/vsc";
const Header = ({
  priceSorting,
  nameSorting,
  setPriceSorting,
  setNameSorting,
  sortingMethod,
  setSortingMethod,
}) => {
  const handleNameSorting = (nameSorting) => {
    if (nameSorting === "ALPHABETICALLY_A_FIRST") {
      setNameSorting("ALPHABETICALLY_Z_FIRST");
      setSortingMethod({
        type: "name",
        method: "ALPHABETICALLY_Z_FIRST",
        arrowDirection: "down",
      });
    } else {
      setNameSorting("ALPHABETICALLY_A_FIRST");
      setSortingMethod({
        type: "name",
        method: "ALPHABETICALLY_A_FIRST",
        arrowDirection: "up",
      });
    }
  };

  const handlePriceSorting = (priceSorting) => {
    if (priceSorting === "PRICE_HIGHEST_FIRST") {
      setPriceSorting("PRICE_LOWEST_FIRST");
      setSortingMethod({
        type: "price",
        method: "PRICE_LOWEST_FIRST",
        arrowDirection: "up",
      });
    } else {
      setPriceSorting("PRICE_HIGHEST_FIRST");
      setSortingMethod({
        type: "price",
        method: "PRICE_HIGHEST_FIRST",
        arrowDirection: "down",
      });
    }
  };

  const setArrow = (type, sortingMethod) => {
    if (sortingMethod.type !== type) return;

    if (sortingMethod.arrowDirection === "up")
      return <VscArrowSmallUp size={24} />;
    if (sortingMethod.arrowDirection === "down")
      return <VscArrowSmallDown size={24} />;
  };

  return (
    <div className="header_cart">
      <div className="header_image_cart">
        <p className="header_title_cart"></p>
      </div>
      <div className="header_name_cart">
        <div
          onClick={() => handleNameSorting(nameSorting)}
          className="toggle_values_header"
        >
          <p className="header_title_cart">name</p>
          <p>{setArrow("name", sortingMethod)}</p>
        </div>
      </div>
      <div className="header_price_cart">
        <div
          onClick={() => handlePriceSorting(priceSorting)}
          className="toggle_values_header"
        >
          <p className="header_title_cart">price</p>
          <p>{setArrow("price", sortingMethod)}</p>
        </div>
      </div>
      <div className="header_remove_button_cart"></div>
    </div>
  );
};

export default Header;
