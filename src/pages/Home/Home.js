import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { pokemons as pokemonAtoms } from "../../atoms";
import { searchValue as searchValueAtoms } from "../../atoms";
import Navbar from "../../components/Navbar/Navbar";
import PokemonList from "../../components/PokemonList/PokemonList";
import SidePanelFilters from "../../components/SidePanelFilters/SidePanelFilters";
import ALL_TYPES from "../../utils/ALL_TYPES.js";

import flattenObject from "../../utils/flattenObject";

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

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(40);

  const [allFilteredPokemons, setAllFilteredPokemons] = useState([]);
  const [allSortedPokemons, setAllSortedPokemons] = useState([]);
  const [storedPokemons, setStoredPokemons] = useState([]);
  const [storedPokemonNames, setStoredPokemonNames] = useState([]);
  const [pokemonToDisplay, setPokemonsToDisplay] = useState([]);

  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);

  const [didLoad, setDidLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [typesToFilter, setTypesToFilter] = useState([]);
  const [pricesToFilter, setPricesToFilter] = useState({
    min: "",
    max: "",
  });
  const [sortingMethod, setSortingMethod] = useState(
    SORTING_METHODS.RELEASE_DATE_OLDEST_FIRST
  );
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

  const getPokemonObjects = async (refrencePokemons) => {
    const pokemons = [];
    for (const pokemon of refrencePokemons) {
      const pokemonName = pokemon.name;
      // console.log(pokemon);
      if (storedPokemonNames.includes(pokemonName)) {
        const newPokemon = storedPokemons.find(
          (pokemon) => pokemon.name === pokemonName
        );
        pokemons.push(newPokemon);
      } else {
        // console.log(pokemonName);
        const data2 = await fetchData(`${BASE_URL}pokemon/${pokemonName}`);
        const newPokemon = {
          name: pokemonName,
          height: data2.height,
          weight: data2.weight,
          types: data2.types,
          image: data2.sprites.front_default,
          price: getPokemonPrice(pokemonName),
        };
        storedPokemons.push(newPokemon);
        storedPokemonNames.push(pokemonName);
        pokemons.push(newPokemon);
      }
    }
    return pokemons;
  };

  //load initial pokemon
  useEffect(() => {
    const setInitialPokemons = async () => {
      setIsLoading(true);
      const data = await fetchData(
        `${BASE_URL}pokemon?offset=0&limit=${pokemonsPerPage}`
      );
      const pokemons = data.results.map((pokemon) => {
        return (pokemon = {
          name: pokemon.name,
          price: getPokemonPrice(pokemon.name),
          index: getIndexFromUrl(pokemon.url),
        });
      });
      setAllFilteredPokemons(pokemons);
    };
    setInitialPokemons();
  }, []);

  //filter pokemon
  useEffect(() => {
    const filterPokemon = async () => {
      let filteredPokemons = await getAllPokemons();

      for (const type of typesToFilter) {
        console.log(type);
        const data = await fetchData(`${BASE_URL}type/${type}`);
        const pokemonOfType = data.pokemon;

        const allPokemonOfType = Object.values(flattenObject(data.pokemon));

        filteredPokemons = filteredPokemons.filter((pokemon) =>
          allPokemonOfType.includes(pokemon.name)
        );
      }
      console.log(filteredPokemons);
      filteredPokemons = filteredPokemons.map((pokemon) => ({
        ...pokemon,
        price: getPokemonPrice(pokemon.name),
      }));
      setAllFilteredPokemons(filteredPokemons);
    };
    filterPokemon();
  }, [typesToFilter, pricesToFilter, searchValue]);

  //sort pokemon
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

  //display pokemon
  useEffect(() => {
    const displayPokemon = async () => {
      const startPokemon = (currentPage - 1) * pokemonsPerPage;
      const endPokemon = currentPage * pokemonsPerPage;
      const pokemonToDisplay = allSortedPokemons.slice(
        startPokemon,
        endPokemon
      );

      console.log(pokemonToDisplay);
      const pokemons = await getPokemonObjects(pokemonToDisplay);
      setPokemonsToDisplay(pokemons);
      setIsLoading(false);
    };
    displayPokemon();
  }, [allSortedPokemons]);
  const addType = () => {
    setTypesToFilter([...typesToFilter, "water"]);
  };

  return (
    <main>
      <p>{searchValue}</p>
      <div onClick={addType}>CLICK</div>
      <Navbar />
      <PokemonList isLoading={isLoading} pokemons={pokemonToDisplay} />
      {/* <SidePanelFilters */}
      {/*   setPricesToFilter={setPricesToFilter} */}
      {/*   setTypeFilters={setTypeFilters} */}
      {/* /> */} {/* <PokemonList pokemons={pokemons} /> */}{" "}
    </main>
  );
};

export default Home;
