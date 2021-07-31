import { useEffect, useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import Select from "react-select";
import SelectSearch from "react-select-search";
import { useRecoilState } from "recoil";

import { allPokemonNames as allPokemonNamesAtoms } from "../../atoms";
import { searchValue as searchValueAtoms } from "../../atoms";

import NavbarCss from "./Navbar.module.css";
import { IconContext } from "react-icons";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);
  const [temporarySearchValue, setTemporarySearchValue] = useState("");

  const input = useRef(null);

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
    }, 250);
    return () => {
      clearTimeout(timeId);
    };
  }, [temporarySearchValue]);

  const focusInput = () => {
    input.current.focus();
  };

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" } }}>
      <div className={NavbarCss.searchbar}>
        <input
          ref={input}
          value={temporarySearchValue}
          onChange={(e) => setTemporarySearchValue(e.target.value)}
        />
        <BiSearch size={25} onClick={focusInput} />
      </div>
    </IconContext.Provider>
  );
};

export default SearchBar;
