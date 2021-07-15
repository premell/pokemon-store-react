import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
