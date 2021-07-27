import { useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonListCss from "./PokemonList.module.css";

const PokemonList = ({ pokemons, isLoading }) => {
  if (isLoading) {
    return (
      <div className={PokemonListCss.main_container}>
        <p className>IS LOADING</p>
      </div>
    );
  } else if (pokemons.length === 0) {
    return (
      <div className={PokemonListCss.main_container}>
        <p className>No Pokemon were found</p>
      </div>
    );
  } else {
    return (
      <div className={PokemonListCss.main_container}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    );
  }
};

export default PokemonList;
