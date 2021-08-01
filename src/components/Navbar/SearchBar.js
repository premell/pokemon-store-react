import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiSearch } from "react-icons/bi";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import SelectSearch from "react-select-search";
import { useRecoilState } from "recoil";

import { allPokemonNames as allPokemonNamesAtoms } from "../../atoms";
import { searchValue as searchValueAtoms } from "../../atoms";
import { recentlyRedirectedBecauseTyping as recentlyRedirectedBecauseTypingAtoms } from "../../atoms";

import NavbarCss from "./Navbar.module.css";

let recentlyRedirected = false;
const SearchBar = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);
  const [temporarySearchValue, setTemporarySearchValue] = useState(
    searchValue ?? ""
  );

  const [hasBeenEdited, setHasBeenEdited] = useState(false);

  const input = useRef(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const timeId = setTimeout(() => {
      setSearchValue(temporarySearchValue);
    }, 250);
    return () => {
      clearTimeout(timeId);
    };
  }, [temporarySearchValue]);

  useEffect(() => {
    setHasBeenEdited(false);
    if (location.pathname === "/" && recentlyRedirected) {
      setTemporarySearchValue(searchValue);
      recentlyRedirected = false;
      input.current.focus();
    } else if (location.pathname !== "/") {
      setTemporarySearchValue("");
      setSearchValue("");
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" && hasBeenEdited) {
      recentlyRedirected = true;
      history.push("/");
    }
  }, [searchValue]);

  const focusInput = () => input.current.focus();

  const handleChange = (e) => {
    setHasBeenEdited(true);
    setTemporarySearchValue(e.target.value);
  };

  return (
    <IconContext.Provider
      value={{
        style: { cursor: "pointer" },
      }}
    >
      <div className={NavbarCss.searchbar}>
        <input
          ref={input}
          value={temporarySearchValue}
          onChange={handleChange}
        />
        <BiSearch size={25} onClick={focusInput} />
      </div>
    </IconContext.Provider>
  );
};

export default SearchBar;
