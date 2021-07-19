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
const DEFAULT_QUERY = "pokemon?offset=0&limit=40";
const ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000";

const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const getAllPokemonNames = async () => {
  const data = await fetchData(`${BASE_URL}pokemon?offset=0&limit=2000`);
  const names = data.results.map((pokemon) => pokemon.name);
  return names;
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

const getPokemonsFromNames = async (names) => {
  const pokemons = [];
  for (const pokemonName of names) {
    const data2 = await fetchData(`${BASE_URL}pokemon/${pokemonName}`);
    const newPokemon = {
      name: pokemonName,
      height: data2.height,
      weight: data2.weight,
      types: data2.types,
      image: data2.sprites.front_default,
      price: getPokemonPrice(pokemonName),
    };
    pokemons.push(newPokemon);
  }
  return pokemons;
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(BASE_URL + DEFAULT_QUERY);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  const [unFilteredPokemons, setUnfilteredPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);

  const [typesToFilter, setTypesToFilter] = useState({
    types: [],
    isFiltering: false,
  });
  const [pricesToFilter, setPricesToFilter] = useState({
    min: "",
    max: "",
    isFiltering: false,
  });

  // console.log(ALL_TYPES);

  useEffect(() => {
    const setInitialPokemons = async () => {
      const data = await fetchData(BASE_URL + DEFAULT_QUERY);
      setNextPage(data.next);
      const names = data.results.map((pokemon) => pokemon.name);
      const pokemons = await getPokemonsFromNames(names);
      setUnfilteredPokemons(pokemons);
    };
    setInitialPokemons();
  }, []);

  useEffect(() => {
    if (
      typesToFilter.isFiltering === false &&
      pricesToFilter.isFiltering === false
    ) {
      setPokemonsToShow();
    }
  }, []);

  //   useEffect(() => {
  //     const updatePokemons = async () => {
  //       const allNewPokemons = [];
  //       for (const pokemonName of pokemonToShow) {
  //         if (pokemonExists(pokemonName, pokemons)) return;
  //
  //         const data = await fetchData(`${BASE_URL}pokemon/${pokemonName}`);
  //         const newPokemon = {
  //           name: pokemonName,
  //           height: data.height,
  //           weight: data.weight,
  //           types: data.types,
  //           image: data.sprites.front_default,
  //           price: data.base_experience + data.id * data.weight,
  //         };
  //         allNewPokemons.push(newPokemon);
  //       }
  //       setPokemons([...pokemons, ...allNewPokemons]);
  //     };
  //     updatePokemons();
  //   }, [pokemonToShow]);

  let isFirstRendering = true;
  useEffect(() => {
    if (isFirstRendering) {
      isFirstRendering = false;
      return;
    }
    if (
      typesToFilter.isFiltering === false &&
      pricesToFilter.isFiltering === false
    ) {
      initialPokemons;
    }
    const getPokemonsToShow = async () => {
      let namesOfPokemonsToShow = await getAllPokemonNames();

      for (const type of typesToFilter.types) {
        const data = await fetchData(`${BASE_URL}type/${type}`);
        const flattenedData = flattenObject(data.pokemon);
        namesOfPokemonsToShow = namesOfPokemonsToShow.filter((name) =>
          Object.values(flattenedData).includes(name)
        );
      }

      const pokemons = await getPokemonsFromNames(namesOfPokemonsToShow);
      setUnfilteredPokemons(pokemons);
    };
    getPokemonsToShow();
  }, [typesToFilter, pricesToFilter, searchValue]);

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return (
    <main>
      <p>{searchValue}</p>
      <Navbar />
      {/* <SidePanelFilters */}
      {/*   setPricesToFilter={setPricesToFilter} */}
      {/*   setTypeFilters={setTypeFilters} */}
      {/* /> */}
      {/* <PokemonList pokemons={pokemons} /> */}
    </main>
  );
};

export default Home;
