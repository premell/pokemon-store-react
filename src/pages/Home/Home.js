import React from "react";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import PokemonList from "../../components/PokemonList/PokemonList";
import SidePanelFilters from "../../components/SidePanelFilters/SidePanelFilters";

const BASE_URL = "https://pokeapi.co/api/v2/";
const DEFAULT_QUERY = "pokemon?offset=0&limit=40";

const getPokemonData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const Home = () => {
  const [pokemonToShow, setPokemonToShow] = useState([]);
  const [pokemonObjects, setPokemonObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(BASE_URL + DEFAULT_QUERY);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  useEffect(() => {
    const setPokemonData = async () => {
      const data = await getPokemonData(BASE_URL + DEFAULT_QUERY);
      setNextPage(data.next);
      const names = data.results.map((pokemon) => pokemon.name);
      setPokemonToShow(names);
    };
    setPokemonData();
  }, []);

  useEffect(() => {
    const newPokemonObjects = [...pokemonObjects];
    pokemonToShow.forEach((pokemonName) => {
      const alreadyExists = pokemonObjects.find(
        (object) => object.name === pokemonName
      );
      if (alreadyExists) return;
      const data = getPokemonData(`${BASE_URL}pokemon/${pokemonName}`);
      const pokemonObject = {
        name: pokemonName,
        height: data.height,
        weight: data.weight,
        types: data.types,
        images: data.sprites,
      };
      newPokemonObjects.push(pokemonObject);
    });
    // );
  }, [pokemonToShow]);

  return (
    <main>
      <Navbar />
      <SidePanelFilters />
      <PokemonList />
    </main>
  );
};

export default Home;
