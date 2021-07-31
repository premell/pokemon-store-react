import { useEffect } from "react";

import TypeFlair from "../../shared/TypeFlair/TypeFlair";
import ALL_TYPES from "../../utils/ALL_TYPES";

import { Dropdown } from "reactjs-dropdown-component";

const ListOfFilters = ({
  typeFilters,
  priceFilters,
  allSortedPokemons,
  setSortingMethod,
}) => {
  const locations = [
    {
      label: "New York",
      value: "newYork",
    },
    {
      label: "Oslo",
      value: "oslo",
    },
    {
      label: "Istanbul",
      value: "istanbul",
    },
  ];
  return (
    <div>
      <p>{allSortedPokemons.length} pokemons matched</p>

      <Dropdown
        name="location"
        title="Select location"
        list={locations}
        onChange={this.onChange}
      />
    </div>
  );
};

export default ListOfFilters;
