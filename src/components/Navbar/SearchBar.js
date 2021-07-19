import { useEffect, useState } from "react";
import Select from "react-select";
import SelectSearch from "react-select-search";
import { useRecoilState } from "recoil";

import { allPokemonNames as allPokemonNamesAtoms } from "../../atoms";
import { searchValue as searchValueAtoms } from "../../atoms";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);
  return (
    <>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
