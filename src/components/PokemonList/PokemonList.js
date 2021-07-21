import { useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonListCss from "./PokemonList.module.css";

const PokemonList = ({ pokemons, isLoading }) => {
  if (isLoading) {
    return <p>IS LOADING</p>;
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
