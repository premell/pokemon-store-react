import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import PageNavigation from "../../components/PageList/PageList";
import { pokemons as pokemonAtoms } from "../../atoms";
import { searchValue as searchValueAtoms } from "../../atoms";
import Navbar from "../../components/Navbar/Navbar";
import PokemonList from "../../components/PokemonList/PokemonList";
import SidePanelFilters from "../../components/SidePanelFilters/SidePanelFilters";
import ALL_TYPES from "../../utils/ALL_TYPES.js";
import flattenObject from "../../utils/flattenObject";

import ListOfFilters from "../../components/ListOfFilters/ListOfFilters";

import HomeCss from "./Home.module.css";
import { popupMessage as popupMessageAtoms } from "../../atoms";
import PopupMessage from "../../shared/PopupMessage/PopupMessage";

const BASE_URL = "https://pokeapi.co/api/v2/";
const ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000";

const SORTING_METHODS = {
  PRICE_LOWEST_FIRST: "PRICE_LOWEST_FIRST",
  PRICE_HIGHEST_FIRST: "PRICE_HIGHEST_FIRST",
  ALPHABETICALLY_A_FIRST: "ALPHABETICALLY_A_FIRST",
  ALPHABETICALLY_Z_FIRST: "ALPHABETICALLY_Z_FIRST",
  RELEASE_DATE_OLDEST_FIRST: "RELEASE_DATE_OLDEST_FIRST",
  RELEASE_DATE_NEWEST_FIRST: "RELEASE_DATE_NEWEST_FIRST",
};

const characterValues = {
  a: "1",
  b: "2",
  c: "3",
  d: "4",
  e: "5",
  f: "6",
  g: "7",
  h: "8",
  i: "9",
  j: "10",
  k: "11",
  l: "12",
  m: "13",
  n: "14",
  o: "15",
  p: "16",
  q: "17",
  r: "18",
  s: "19",
  t: "20",
  u: "21",
  v: "22",
  w: "23",
  x: "24",
  y: "25",
  z: "26",
};

const getIndexFromUrl = (url) => {
  const index = url.replace(/.*?(\d+)\/$/, "$1");
  return parseInt(index);
};

const getPokemonPrice = (name) => {
  return name.length * 5 * characterValues[name[3]];
};

const pokemonExists = (pokemonName, allPokemons) => {
  const findPokemon = allPokemons.find(
    (pokemon) => pokemon.name === pokemonName
  );
  const doesExist = findPokemon === undefined ? false : true;
  return doesExist;
};

const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const getAllPokemons = async () => {
  const data = await fetchData(`${BASE_URL}pokemon?offset=0&limit=2000`);
  const pokemon = data.results;
  return pokemon;
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);

  const [typeFilteredPokemon, setTypeFilteredPokemon] = useState([]);
  const [allFilteredPokemons, setAllFilteredPokemons] = useState([]);
  const [allSortedPokemons, setAllSortedPokemons] = useState([]);
  const [pokemonToDisplay, setPokemonsToDisplay] = useState([]);

  const [storedPokemons, setStoredPokemons] = useState([]);
  const [storedPokemonNames, setStoredPokemonNames] = useState([]);

  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);

  const [isLoading, setIsLoading] = useState(true);

  const [typeFilters, setTypeFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState({
    min: 0,
    max: 2500,
  });
  const [sortingMethod, setSortingMethod] = useState(
    SORTING_METHODS.RELEASE_DATE_OLDEST_FIRST
  );

  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);

  const setPokemonObjectsToDisplay = useCallback(
    (refrencePokemons) => {
      const pokemons = [];
      Promise.all(
        refrencePokemons.map(async (pokemon) => {
          const pokemonName = pokemon.name;
          if (storedPokemonNames.includes(pokemonName)) {
            const newPokemon = storedPokemons.find(
              (pokemon) => pokemon.name === pokemonName
            );
            pokemons.push(newPokemon);
          } else {
            const data2 = await fetchData(`${BASE_URL}pokemon/${pokemonName}`);
            const newPokemon = {
              name: pokemonName,
              types: data2.types,
              image: data2.sprites.front_default,
              price: pokemon.price,
            };
            storedPokemons.push(newPokemon);
            storedPokemonNames.push(pokemonName);
            pokemons.push(newPokemon);
          }
        })
      ).then(() => {
        setPokemonsToDisplay(pokemons);
        setIsLoading(false);
      });
    },
    [storedPokemonNames, storedPokemons]
  );
  useEffect(() => {
    setPopupMessage((popupMessage) => ({ ...popupMessage, show: false }));
  }, []);

  useEffect(() => {
    const filterPokemonBasedOnType = async () => {
      setIsLoading(true);
      let typeFilteredPokemon = await getAllPokemons();

      for (const type of typeFilters) {
        const data = await fetchData(`${BASE_URL}type/${type}`);

        const allPokemonOfType = Object.values(flattenObject(data.pokemon));

        typeFilteredPokemon = typeFilteredPokemon = typeFilteredPokemon.filter(
          (pokemon) => allPokemonOfType.includes(pokemon.name)
        );
      }
      typeFilteredPokemon = typeFilteredPokemon.map((pokemon) => {
        return {
          ...pokemon,
          price: getPokemonPrice(pokemon.name),
          index: getIndexFromUrl(pokemon.url),
        };
      });
      setTypeFilteredPokemon(typeFilteredPokemon);
      setIsLoading(false);
    };
    filterPokemonBasedOnType();
  }, [typeFilters]);

  useEffect(() => {
    setIsLoading(true);
    const filteredPokemons = [...typeFilteredPokemon];

    const filteredPokemonsByMinPrice = filteredPokemons.filter(
      (pokemon) => pokemon.price >= priceFilters.min
    );
    const filteredPokemonsByMaxPrice = filteredPokemonsByMinPrice.filter(
      (pokemon) => pokemon.price <= priceFilters.max
    );
    const filteredPokemonsBySearchQuery = filteredPokemonsByMaxPrice.filter(
      (pokemon) => pokemon.name.includes(searchValue)
    );

    setAllFilteredPokemons(filteredPokemonsBySearchQuery);
  }, [typeFilteredPokemon, priceFilters, searchValue]);

  useEffect(() => {
    setIsLoading(true);
    const sortedPokemon = [...allFilteredPokemons];

    switch (sortingMethod) {
      case SORTING_METHODS.ALPHABETICALLY_A_FIRST:
        sortedPokemon.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case SORTING_METHODS.ALPHABETICALLY_Z_FIRST:
        sortedPokemon.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;
      case SORTING_METHODS.PRICE_HIGHEST_FIRST:
        sortedPokemon.sort((a, b) => (a.price < b.price ? 1 : -1));
        break;
      case SORTING_METHODS.PRICE_LOWEST_FIRST:
        sortedPokemon.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      case SORTING_METHODS.RELEASE_DATE_NEWEST_FIRST:
        sortedPokemon.sort((a, b) => (a.index < b.index ? 1 : -1));
        break;
      case SORTING_METHODS.RELEASE_DATE_OLDEST_FIRST:
        sortedPokemon.sort((a, b) => (a.index > b.index ? 1 : -1));
        break;
      default:
    }
    setAllSortedPokemons(sortedPokemon);
  }, [allFilteredPokemons, sortingMethod]);

  // display pokemon
  useEffect(() => {
    setIsLoading(true);
    const displayPokemon = async () => {
      console.log(pokemonsPerPage);
      const startPokemon = (currentPage - 1) * pokemonsPerPage;
      const endPokemon = currentPage * pokemonsPerPage;
      if (endPokemon >= allSortedPokemons.length) setIsLastPage(true);
      else setIsLastPage(false);
      const pokemonToDisplay = [...allSortedPokemons].slice(
        startPokemon,
        endPokemon
      );
      setPokemonObjectsToDisplay(pokemonToDisplay);
    };
    displayPokemon();
  }, [allSortedPokemons, pokemonsPerPage, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, typeFilters, priceFilters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const updateSortingMethod = (method) => {
    setSortingMethod(method);
  };

  return (
    <main>
      <PopupMessage
        show={popupMessage.show}
        message={popupMessage.message}
        type={popupMessage.type}
      />
      <Navbar />
      <div className={HomeCss.main_container}>
        <SidePanelFilters
          setPriceFilters={setPriceFilters}
          setTypeFilters={setTypeFilters}
          typeFilters={typeFilters}
          priceFilters={priceFilters}
        />
        <div>
          <ListOfFilters
            typeFilters={typeFilters}
            priceFilters={priceFilters}
            updateSortingMethod={updateSortingMethod}
            numberOfPokemon={allSortedPokemons.length}
            setTypeFilters={setTypeFilters}
            setPriceFilters={setPriceFilters}
            setPokemonsPerPage={setPokemonsPerPage}
          />
          <PokemonList isLoading={isLoading} pokemons={pokemonToDisplay} />
          <PageNavigation
            pokemonsPerPage={pokemonsPerPage}
            numberOfPokemon={allSortedPokemons.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLastPage={isLastPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
