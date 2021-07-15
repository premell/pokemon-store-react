import PokemonCard from "./PokemonCard";
import PokemonListCss from "./PokemonList.module.css";

const PokemonList = ({ pokemons }) => {
  return (
    <div className={PokemonListCss.main_container}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
