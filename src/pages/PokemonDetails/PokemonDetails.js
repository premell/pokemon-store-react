import { useEffect, useState } from "react";

import TypeFlair from "../../shared/TypeFlair/TypeFlair";

import PokemonDetailsCss from "./PokemonDetails.module.css";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const imageListDefault = [
  "front_default",
  "back_default",
  "front_shint",
  "back_shiny",
];
const imageListFemale = [
  "front_female",
  "back_female",
  "front_shiny_female",
  "back_shiny_female",
];

let pokemonDetails;
const PokemonDetails = ({ location }) => {
  const pokemon = location.state.pokemon;
  const [isLoading, setIsLoading] = useState(true);

  const [imageToDisplay, setImageToDisplay] = useState("");

  const [imageDefaultCurrent, setImageDefaultCurrent] = useState(
    imageListDefault[0]
  );
  const [imageFemaleCurrent, setImageFemaleCurrent] = useState(
    imageListFemale[0]
  );

  useEffect(() => {
    const getPokemonDetails = async () => {
      setIsLoading(true);
      console.log(BASE_URL + pokemon.name);
      const res = await fetch(`${BASE_URL}${pokemon.name}`);
      pokemonDetails = await res.json();
      console.log(pokemonDetails);
      pokemonDetails.abilities.map((ability) => {
        console.log(ability.ability.name);
        console.log(ability.is_hidden);
      });
      setIsLoading(false);
    };
    getPokemonDetails();
  }, []);

  const previousImage = () => {};
  const nextImage = () => {};

  if (isLoading) {
    return <div>LOADING</div>;
  }

  const image_state = "FEMALE";

  return (
    <div className={PokemonDetailsCss.main_container}>
      <div className={PokemonDetailsCss.toggle_container}>
        <div
          className={
            image_state === "FEMALE"
              ? PokemonDetailsCss.active
              : PokemonDetailsCss.in_active
          }
        >
          MALE
        </div>
        <div>FEMALE</div>
      </div>
      <div onClick={previousImage}>LEFT</div>
      <img src={pokemonDetails?.sprites.front_default} />
      {pokemonDetails?.types.map((type) => (
        <TypeFlair key={type.type.name} type={type.type.name} />
      ))}
      <div onClick={nextImage}>RIGHT</div>
      <ul>
        {pokemonDetails?.abilities.map((ability) => {
          if (ability.is_hidden === true) return;
          return <li key={ability.ability.name}>{ability.ability.name}</li>;
        })}
        <li className={PokemonDetailsCss.ability_divider}>Hidden:</li>
        {pokemonDetails?.abilities.map((ability) => {
          if (ability.is_hidden === false) return;
          return <li key={ability.ability.name}>{ability.ability.name}</li>;
        })}
      </ul>
      <h3>{pokemon.price}</h3>
    </div>
  );
};

export default PokemonDetails;
