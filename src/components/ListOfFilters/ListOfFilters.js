import DropDown from "./DropDown";
import FilterItem from "./FilterItem";
const sortingMethods = [
  { value: "PRICE_LOWEST_FIRST", label: "lowest price" },
  { value: "PRICE_HIGHEST_FIRST", label: "highest price" },
  { value: "ALPHABETICALLY_A_FIRST", label: "alphabetically A-Z" },
  { value: "ALPHABETICALLY_Z_FIRST", label: "alphabetically Z-A" },
  { value: "RELEASE_DATE_NEWEST_FIRST", label: "newest" },
  { value: "RELEASE_DATE_OLDEST_FIRST", label: "oldest" },
];
const formatNumber = (number) => {
  if (number > 1000) return "1000+";
  else if (number > 900) return "900+";
  else if (number > 800) return "800+";
  else if (number > 700) return "700+";
  else if (number > 600) return "600+";
  else if (number > 500) return "500+";
  else if (number > 400) return "400+";
  else if (number > 300) return "300+";
  else if (number > 200) return "200+";
  else if (number > 100) return "100+";
  else return number + "";
};

const ListOfFilters = ({
  numberOfMatchedPokemon,
  typeFilters,
  priceFilters = {
    min: 0,
    max: 2500,
  },
  updateSortingMethod,
  setTypeFilters,
  setPriceFilters,
  setPokemonsPerPage,
}) => {
  const priceFilterActive = priceFilters.min !== 0 || priceFilters.max !== 2500;
  const anyFilterActive = priceFilterActive || typeFilters.length >= 1;

  const removeFilter = (filter, type) => {
    if (type === "price") {
      setPriceFilters({ min: 0, max: 2500 });
    } else {
      setTypeFilters(typeFilters.filter((type) => type !== filter));
    }
  };

  const clearAllFilters = () => {
    setPriceFilters({ min: 0, max: 2500 });
    setTypeFilters([]);
  };
  return (
    <div className="main_container_list_of_filters">
      <div className="upper_container_list_of_filters">
        <p className="amount_container_list_of_filters">
          {formatNumber(numberOfMatchedPokemon)} pokemons
        </p>
        <div className="dropdown_container_list_of_filters">
          <DropDown
            items={sortingMethods}
            defaultSelected={sortingMethods[5]}
            handleNewItem={(item) => updateSortingMethod(item.value)}
            type="sorting"
          />
          <DropDown
            items={[
              { value: 20, label: 20 },
              { value: 50, label: 50 },
              { value: 100, label: 100 },
            ]}
            defaultSelected={{ value: 20, label: 20 }}
            handleNewItem={(item) => setPokemonsPerPage(item.value)}
            type="page"
          />
        </div>
      </div>
      <hr className="solid_list_of_filters" />
      <div className="bottom_container_list_of_filters">
        {priceFilterActive && (
          <FilterItem
            removeFilter={removeFilter}
            type="price"
            filter={priceFilters}
          />
        )}
        {typeFilters &&
          typeFilters.map((type) => (
            <FilterItem
              removeFilter={removeFilter}
              key={type}
              type="type"
              filter={type}
            />
          ))}
        {anyFilterActive && (
          <div className="clear_all_list_of_filters" onClick={clearAllFilters}>
            Clear filters
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOfFilters;
