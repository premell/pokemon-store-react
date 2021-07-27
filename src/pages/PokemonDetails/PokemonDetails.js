import "./PokemonDetails.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";

import TypeFlair from "../../shared/TypeFlair/TypeFlair";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let imageListDefault = [];
let imageListFemale = [];

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

let pokemonDetails;
const PokemonDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [isLoading, setIsLoading] = useState(true);
  const [imageGender, setImageGender] = useState("MALE");

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
      imageListDefault = [];
      imageFemaleCurrent = [];
      console.log(BASE_URL + id);
      const res = await fetch(`${BASE_URL}${id}`);
      pokemonDetails = await res.json();
      pokemonDetails = { ...pokemonDetails, price: getPokemonPrice(id) };
      console.log(pokemonDetails.sprites);

      Object.keys(pokemonDetails.sprites).forEach((key) => {
        const url = pokemonDetails.sprites[key];
        if (url === null || url === undefined || typeof url !== "string")
          return;

        console.log(key);
        if (key === "back_default") imageListDefault.push({ url: url });
        else if (key === "back_shiny") imageListDefault.push({ url: url });
        else if (key === "front_default")
          imageListDefault.unshift({ url: url });
        else if (key === "front_shiny")
          imageListDefault.splice(2, 0, { url: url });
        else if (key === "back_female") imageListFemale.push({ url: url });
        else if (key === "back_shiny_female")
          imageListFemale.push({ url: url });
        else if (key === "front_female") imageListFemale.unshift({ url: url });
        else if (key === "front_shiny_female")
          imageListFemale.splice(2, 0, { url: url });

        console.log(imageListFemale);
      });
      setIsLoading(false);
    };
    getPokemonDetails();
  }, []);

  const handleGenderClick = (e) => {
    const classes = e.target.attributes.class.nodeValue;
    const regex = new RegExp("inactive");
    if (regex.test(classes)) {
      setImageGender((imageGender) =>
        imageGender === "MALE" ? "FEMALE" : "MALE"
      );
    }
  };

  console.log(imageGender);
  console.log(imageListFemale);
  if (
    (imageGender === "MALE" && imageListDefault.length === 1) ||
    (imageGender === "FEMALE" && imageListFemale.length === 1)
  )
    console.log("TRUE");

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div className="main_container">
      <div className="toggle_container_pokemondetails">
        <div
          onClick={handleGenderClick}
          className={
            imageGender === "MALE"
              ? "image_gender_pokemondetails  active_pokemondetails"
              : "image_gender_pokemondetails inactive_pokemondetails"
          }
        >
          MALE
        </div>
        <div
          onClick={handleGenderClick}
          className={
            imageGender === "FEMALE"
              ? "image_gender_pokemondetails active_pokemondetails"
              : "image_gender_pokemondetails inactive_pokemondetails"
          }
        >
          FEMALE
        </div>
      </div>
      {(imageGender === "MALE" && imageListDefault.length === 0) ||
      (imageGender === "FEMALE" && imageListFemale.length === 0) ? (
        <div>Sorry, no {imageGender.toLowerCase()} images are available</div>
      ) : (
        <SimpleImageSlider
          width={400}
          height={400}
          images={imageGender === "MALE" ? imageListDefault : imageListFemale}
          bgColor="#474747"
          showNavs={true}
          showBullets={true}
        />
      )}{" "}
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
      <h3>{pokemonDetails?.price}</h3>
    </div>
  );
};

export default PokemonDetails;
