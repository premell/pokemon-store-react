import { useCallback, useEffect, useState } from "react";

import ListOfFilters from "../ListOfFilters/ListOfFilters";
import PageList from "../PageList/PageList";
import PokemonList from "../PokemonList/PokemonList";

import PokemonContainerCss from "./PokemonContainer.module.css";

const SORTING_METHODS = {
  PRICE_LOWEST_FIRST: "PRICE_LOWEST_FIRST",
  PRICE_HIGHEST_FIRST: "PRICE_HIGHEST_FIRST",
  ALPHABETICALLY_A_FIRST: "ALPHABETICALLY_A_FIRST",
  ALPHABETICALLY_Z_FIRST: "ALPHABETICALLY_Z_FIRST",
  RELEASE_DATE_OLDEST_FIRST: "RELEASE_DATE_OLDEST_FIRST",
  RELEASE_DATE_NEWEST_FIRST: "RELEASE_DATE_NEWEST_FIRST",
};
const PokemonContainer = ({
  typeFilters,
  priceFilters,
  setTypeFilters,
  setPriceFilters,
}) => {
  const [numberOfMatchedPokemon, setNumberOfMatchedPokemon] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);

  const [sortingMethod, setSortingMethod] = useState(
    SORTING_METHODS.RELEASE_DATE_OLDEST_FIRST
  );

  const updateNumberOfMatchedPokemon = (currentNumber, newNumber) => {
    if (currentNumber !== newNumber) setNumberOfMatchedPokemon(newNumber);
  };

  return (
    <div className={PokemonContainerCss.main_container}>
      <ListOfFilters
        typeFilters={typeFilters}
        priceFilters={priceFilters}
        updateSortingMethod={setSortingMethod}
        setTypeFilters={setTypeFilters}
        setPriceFilters={setPriceFilters}
        setPokemonsPerPage={setPokemonsPerPage}
        numberOfMatchedPokemon={numberOfMatchedPokemon}
      />
      <PokemonList
        pokemonsPerPage={pokemonsPerPage}
        currentPage={currentPage}
        sortingMethod={sortingMethod}
        setSortingMethod={setSortingMethod}
        priceFilters={priceFilters}
        typeFilters={typeFilters}
        setCurrentPage={setCurrentPage}
        updateNumberOfMatchedPokemon={(newNumber) =>
          updateNumberOfMatchedPokemon(numberOfMatchedPokemon, newNumber)
        }
      />
      <PageList
        pokemonsPerPage={pokemonsPerPage}
        numberOfMatchedPokemon={numberOfMatchedPokemon}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLastPage={isLastPage}
      />
    </div>
  );
};

export default PokemonContainer;
