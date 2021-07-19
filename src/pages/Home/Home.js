import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { pokemons as pokemonAtoms } from "../../atoms";
import { allPokemonNames as allPokemonNamesAtoms } from "../../atoms";
import Navbar from "../../components/Navbar/Navbar";
import PokemonList from "../../components/PokemonList/PokemonList";
import SidePanelFilters from "../../components/SidePanelFilters/SidePanelFilters";

const BASE_URL = "https://pokeapi.co/api/v2/";
const DEFAULT_QUERY = "pokemon?offset=0&limit=40";
const ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000";

const fetchPokemonData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const pokemonExists = (pokemonName, allPokemons) => {
  const findPokemon = allPokemons.find(
    (pokemon) => pokemon.name === pokemonName
  );
  const doesExist = findPokemon === undefined ? false : true;

  return doesExist;
};

const Home = () => {
  const [pokemonToShow, setPokemonToShow] = useState([]);

  const [currentPage, setCurrentPage] = useState(BASE_URL + DEFAULT_QUERY);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  const [pokemons, setPokemons] = useRecoilState(pokemonAtoms);
  const [allPossiblePokemons, setAllPossiblePokemons] =
    useRecoilState(allPokemonNamesAtoms);

  useEffect(() => {
    const setCurrentPokemonNames = async () => {
      const data = await fetchPokemonData(BASE_URL + DEFAULT_QUERY);
      setNextPage(data.next);
      const names = data.results.map((pokemon) => pokemon.name);
      setPokemonToShow(names);
    };
    const setAllPokemonNames = async () => {
      const data = await fetchPokemonData(ALL_POKEMON_URL);
      setNextPage(data.next);
      const names = data.results.map((pokemon) => pokemon.name);
      setAllPossiblePokemons(names);
    };
    setCurrentPokemonNames();
    setAllPokemonNames();
  }, []);

  useEffect(() => {
    const updatePokemons = async () => {
      const allNewPokemons = [];
      for (const pokemonName of pokemonToShow) {
        if (pokemonExists(pokemonName, pokemons)) return;

        const data = await fetchPokemonData(
          `${BASE_URL}pokemon/${pokemonName}`
        );
        const newPokemon = {
          name: pokemonName,
          height: data.height,
          weight: data.weight,
          types: data.types,
          image: data.sprites.front_default,
          price: data.base_experience + data.id * data.weight,
        };
        allNewPokemons.push(newPokemon);
      }
      setPokemons([...pokemons, ...allNewPokemons]);
    };
    updatePokemons();
  }, [pokemonToShow]);

  const setFilters = (filters) => {};

  return (
    <main>
      <Navbar />
      <SidePanelFilters setFilters={setFilters} />
      <PokemonList pokemons={pokemons} />
    </main>
  );
};

export default Home;
