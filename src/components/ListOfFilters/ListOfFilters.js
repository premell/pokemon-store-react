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

const ListOfFilters = ({
  numberOfPokemon,
  typeFilters,
  priceFilters = {
    min: 0,
    max: 2500,
  },
  updateSortingMethod,
}) => {
  const priceFilterActive = priceFilters.min !== 0 || priceFilters.max !== 2500;
  const anyFilterActive = priceFilterActive || typeFilters.length >= 1;

  const formatNumber = (number) => {
    if (number > 100) return "100+";
    else if (number > 200) return "200+";
    else if (number > 300) return "300+";
    else if (number > 400) return "400+";
    else if (number > 500) return "500+";
    else if (number > 600) return "600+";
    else if (number > 700) return "700+";
    else if (number > 800) return "800+";
    else if (number > 900) return "900+";
    else if (number > 1000) return "1000+";
  };
  return (
    <div className="main_container_list_of_filters">
      <div className="upper_container_list_of_filters">
        <p>{formatNumber(numberOfPokemon)} pokemons</p>
        <DropDown
          items={sortingMethods}
          defaultSelected={sortingMethods[5]}
          handleNewItem={(item) => updateSortingMethod(item.value)}
        />
      </div>
      <hr className="solid_list_of_filters" />
      <div className="bottom_container_list_of_filters">
        {typeFilters &&
          typeFilters.map((type) => (
            <FilterItem key={type} type="type" filter={type} />
          ))}
        {priceFilterActive && <FilterItem type="price" filter={priceFilters} />}
        {anyFilterActive && <div>Clear filters</div>}
      </div>
    </div>
  );
};

export default ListOfFilters;
