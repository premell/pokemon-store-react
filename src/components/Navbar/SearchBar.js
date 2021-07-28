import { useEffect, useState } from "react";
import Select from "react-select";
import SelectSearch from "react-select-search";
import { useRecoilState } from "recoil";

import { allPokemonNames as allPokemonNamesAtoms } from "../../atoms";
import { searchValue as searchValueAtoms } from "../../atoms";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);
  const [temporarySearchValue, setTemporarySearchValue] = useState("");

  function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      setSearchValue(temporarySearchValue);
    }, 400);
    return () => {
      clearTimeout(timeId);
    };
  }, [temporarySearchValue]);

  return (
    <>
      <input
        value={temporarySearchValue}
        onChange={(e) => setTemporarySearchValue(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
