import "./ListOfFilters.css";
import TypeFlair from "../../shared/TypeFlair/TypeFlair";
import { GrFormClose } from "react-icons/gr";
const FilterItem = ({ type, filter, removeFilter }) => {
  const formatNumberWithCommas = (number) => {
    if (typeof number !== "number") return 0;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (type === "price") {
    return (
      <>
        <div className="filter_price_item_filter_item">{`Price: $${formatNumberWithCommas(
          filter?.min
        )} - $${formatNumberWithCommas(filter?.max)}`}</div>
        <div
          onClick={() => removeFilter(filter, type)}
          className="remove_icon_filter_item"
        >
          <GrFormClose size={25} />
        </div>
      </>
    );
  } else {
    return (
      <div className="filter_type_item_filter_item">
        <TypeFlair type={filter} />
        <div
          onClick={() => removeFilter(filter, type)}
          className="remove_icon_filter_item behind_flair_filter_item"
        >
          <GrFormClose size={25} />
        </div>
      </div>
    );
  }
};
export default FilterItem;
