import "./PokemonDetails.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";

import TypeFlair from "../../shared/TypeFlair/TypeFlair";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const imageListDefault = [{}];

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
const moveDecimalPoint = (weight) => {
  let weightToModify = weight + "";
  if (weightToModify.length === 1) {
    weightToModify = "0." + weightToModify;
  } else {
    weightToModify = weightToModify.replace(/([0-9]+)([0-9])/, "$1.$2");
    weightToModify = weightToModify.replace(/.0$/, "");
  }
  return weightToModify;
};

const toPokemonNumber = (number) => {
  let numberToModify = number + "";
  const numberOfCharacters = number.length;
  if (numberOfCharacters <= 0 || numberOfCharacters >= 5)
    numberOfCharacters = "000";
  else if (numberOfCharacters === 1) {
    numberToModify = "00" + numberToModify;
  } else if (numberOfCharacters === 2) {
    numberToModify = "0" + numberToModify;
  }
  numberToModify = "#" + numberToModify;
};

let pokemonDetails;
const PokemonDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonDetails = async () => {
      setIsLoading(true);
      imageListDefault.splice(0, imageListDefault.length);
      console.log(BASE_URL + id);
      const res = await fetch(`${BASE_URL}${id}`);
      pokemonDetails = await res.json();
      pokemonDetails = { ...pokemonDetails, price: getPokemonPrice(id) };
      console.log(pokemonDetails);

      Object.keys(pokemonDetails.sprites).forEach((key) => {
        const url = pokemonDetails.sprites[key];
        if (url === null || url === undefined || typeof url !== "string")
          return;

        if (key === "back_default") imageListDefault.push({ url: url });
        else if (key === "back_shiny") imageListDefault.push({ url: url });
        else if (key === "front_default")
          imageListDefault.unshift({ url: url });
        else if (key === "front_shiny")
          imageListDefault.splice(2, 0, { url: url });
      });
      setIsLoading(false);
    };
    getPokemonDetails();
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div className="main_container">
      <SimpleImageSlider
        width={450}
        height={450}
        images={imageListDefault}
        bgColor="#474747"
        showNavs={true}
        showBullets={true}
      />

      <h3>
        {id} {toPokemonNumber(pokemonDetails?.order)}
      </h3>
      {pokemonDetails?.types.map((type) => (
        <TypeFlair key={type.type.name} type={type.type.name} />
      ))}
      <ul>
        {pokemonDetails?.abilities.map((ability) => {
          if (ability.is_hidden === true) return;
          return <li key={ability.ability.name}>{ability.ability.name}</li>;
        })}
        <li className="ability_divider">Hidden: </li>
        {pokemonDetails?.abilities.map((ability) => {
          if (ability.is_hidden === false) return;
          return <li key={ability.ability.name}>{ability.ability.name}</li>;
        })}
      </ul>

      <ul>
        <li>Psyics</li>
        <li>height: {pokemonDetails?.height} m</li>
        <li>weight: {moveDecimalPoint(pokemonDetails?.weight)} kg</li>
      </ul>

      <h3>{pokemonDetails?.price}</h3>
    </div>
  );
};

export default PokemonDetails;
