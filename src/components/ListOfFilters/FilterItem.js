import "./ListOfFilters.css";

const FilterItem = ({ type, filter }) => {
  console.log(filter);

  const formatNumberWithCommas = (number) => {
    console.log(typeof number);
    if (typeof number !== "number") return 0;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (type === "price") {
    return (
      <div className="filter_price_item_filter_item">{`Price: $${formatNumberWithCommas(
        filter?.min
      )} - $${formatNumberWithCommas(filter?.max)}`}</div>
    );
  } else {
    return <div className="filter_type_item_filter_item"></div>;
  }
};
export default FilterItem;
