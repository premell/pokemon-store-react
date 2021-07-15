import TypeFlair from "../../shared/TypeFlair";
import PokemonCardCss from "./PokemonCard.module.css";

const PokemonCard = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div className={PokemonCardCss.container}>
      <img src={pokemon.image} />
      <main>
        {pokemon.name}
        {pokemon.types.map((type) => (
          <TypeFlair type={type.type.name} />
        ))}
      </main>
    </div>
  );
};

export default PokemonCard;
