import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { pokemons as pokemonAtoms } from "../../atoms";
import Navbar from "../../components/Navbar/Navbar";
import PokemonList from "../../components/PokemonList/PokemonList";
import SidePanelFilters from "../../components/SidePanelFilters/SidePanelFilters";

const BASE_URL = "https://pokeapi.co/api/v2/";
const DEFAULT_QUERY = "pokemon?offset=0&limit=40";

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
  console.log(pokemons);

  useEffect(() => {
    const setPokemonData = async () => {
      const data = await fetchPokemonData(BASE_URL + DEFAULT_QUERY);
      setNextPage(data.next);
      const names = data.results.map((pokemon) => pokemon.name);
      setPokemonToShow(names);
    };
    setPokemonData();
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
          images: data.sprites.front_default,
        };
        allNewPokemons.push(newPokemon);
      }
      console.log(pokemons);
      console.log(allNewPokemons);
      setPokemons([...pokemons, ...allNewPokemons]);
    };
    updatePokemons();
  }, [pokemonToShow]);

  return (
    <main>
      <Navbar />
      <SidePanelFilters />
      <PokemonList pokemons={pokemons} />
    </main>
  );
};

export default Home;
