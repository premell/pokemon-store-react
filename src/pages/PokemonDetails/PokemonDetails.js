import "./PokemonDetails.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import { useRecoilState } from "recoil";

import { cart as cartAtom } from "../../atoms";
import { popupMessage as popupMessageAtoms } from "../../atoms";
import PopupMessage from "../../shared/PopupMessage/PopupMessage";
import TypeFlair from "../../shared/TypeFlair/TypeFlair";
import Navbar from "../../components/Navbar/Navbar";

import ImageList from "./ImageList";
import StatsList from "./StatsList";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const imageListDefault = [{}];

const formatNumberWithCommas = (number) => {
  if (typeof number !== "number") return 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
  const numberOfCharacters = number?.length;
  if (numberOfCharacters <= 0 || numberOfCharacters >= 5)
    numberOfCharacters = "000";
  else if (numberOfCharacters === 1) {
    numberToModify = "00" + numberToModify;
  } else if (numberOfCharacters === 2) {
    numberToModify = "0" + numberToModify;
  }
  numberToModify = "#" + numberToModify;
  return numberToModify;
};

let pokemonDetails;
let pokedexEntry;
const PokemonDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useRecoilState(cartAtom);

  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);
  const [currentImage, setCurrentImage] = useState("");
  console.log(id);

  useEffect(() => {
    setPopupMessage((popupMessage) => ({ ...popupMessage, show: false }));
  }, []);
  useEffect(() => {
    const getPokemonDetails = async () => {
      setIsLoading(true);
      console.log(id);
      imageListDefault.splice(0, imageListDefault.length);
      const res = await fetch(`${BASE_URL}${id}`);
      pokemonDetails = await res.json();
      console.log(pokemonDetails.order);

      const res2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonDetails.id}`
      );
      const data = await res2.json();
      for (const entry of data.flavor_text_entries) {
        if (entry.language.name === "en") {
          pokedexEntry = entry.flavor_text;
        }
      }
      pokemonDetails = {
        ...pokemonDetails,
        pokedexEntry: pokedexEntry,
        price: getPokemonPrice(id),
      };

      Object.keys(pokemonDetails.sprites).forEach((key) => {
        const url = pokemonDetails.sprites[key];
        if (url === null || url === undefined || typeof url !== "string")
          return;

        if (key === "back_default")
          imageListDefault.push({ name: key, url: url });
        else if (key === "back_shiny")
          imageListDefault.push({ name: key, url: url });
        else if (key === "front_default") {
          imageListDefault.unshift({ name: key, url: url });
          setCurrentImage({ name: key, url: url });
        } else if (key === "front_shiny")
          imageListDefault.splice(2, 0, { name: key, url: url });
      });
      setIsLoading(false);
    };

    getPokemonDetails();
  }, []);

  const addToCart = () => {
    const alreadyExists = cart.pokemon.find(
      (pokemon) => pokemon.name === pokemonDetails.name
    );
    let newPopupMessage = {
      message: `${pokemonDetails.name} added to cart`,
      show: true,
      type: "positive",
    };
    if (alreadyExists === undefined) {
      const newCart = {
        pokemon: [
          ...cart.pokemon,
          {
            name: pokemonDetails.name,
            image: pokemonDetails.sprites.front_default,
            price: pokemonDetails.price,
          },
        ],
        total: cart.total + pokemonDetails.price,
      };
      setCart(newCart);
    } else {
      newPopupMessage.message = `${pokemonDetails.name} already exists in cart`;
    }

    setPopupMessage(newPopupMessage);
  };

  const deleteFromCart = () => {
    const newCartPokemon = cart.pokemon.filter(
      (cartPokemon) => cartPokemon.name !== pokemonDetails.name
    );
    const newTotal = cart.total - pokemonDetails.price;
    setCart({ pokemon: newCartPokemon, total: newTotal });

    const newPopupMessage = {
      message: `${pokemonDetails.name} removed from cart`,
      show: true,
      type: "negative",
    };
    setPopupMessage(newPopupMessage);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      console.log(popupMessage);
      if (popupMessage.show === true)
        setPopupMessage((popupMessage) => ({ ...popupMessage, show: false }));
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [popupMessage]);

  const setPrimaryImage = (image) => {
    const newPrimaryImage = imageListDefault.filter(
      (imageToFilter) => imageToFilter.name === image.name
    );

    setCurrentImage(newPrimaryImage[0]);
  };

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div className="main_container">
      <PopupMessage
        show={popupMessage.show}
        message={popupMessage.message}
        type={popupMessage.type}
      />
      <Navbar />
      <div className="pokemon_container_pokemondetails">
        <div className="top_container_pokemondetails">
          <ImageList
            setPrimaryImage={setPrimaryImage}
            images={imageListDefault}
            currentImage={currentImage}
          />
          <img className="main_image_pokemondetails" src={currentImage.url} />
          <div className="right_container_pokemondetails">
            <h3 className="name_pokemondetails">
              {id} {toPokemonNumber(pokemonDetails?.order)}
            </h3>
            <div style={{ display: "flex" }}>
              {pokemonDetails?.types.map((type) => (
                <TypeFlair key={type.type.name} type={type.type.name} />
              ))}
            </div>
            <p className="header_pokemondetails">abilities</p>
            {pokemonDetails?.abilities.map((ability) => {
              if (ability.is_hidden === true) return;
              return (
                <p
                  className="abilities_pokemondetails"
                  key={ability.ability.name}
                >
                  {ability.ability.name}
                </p>
              );
            })}
            <p className="header_pokemondetails">hidden</p>
            {pokemonDetails?.abilities.map((ability) => {
              if (ability.is_hidden === false) return;
              return (
                <p
                  className="abilities_pokemondetails"
                  key={ability.ability.name}
                >
                  {ability.ability.name}
                </p>
              );
            })}
            <div>
              <StatsList stats={pokemonDetails?.stats} />
            </div>
            <h3>$ {formatNumberWithCommas(pokemonDetails?.price)}</h3>
            {cart.pokemon.find(
              (cartPokemon) => cartPokemon.name === pokemonDetails.name
            ) === undefined ? (
              <div
                onClick={() => addToCart()}
                className="add_button_pokemondetails"
              >
                add to cart
              </div>
            ) : (
              <div
                onClick={() => deleteFromCart()}
                className="delete_button_pokemondetails"
              >
                remove from cart
              </div>
            )}
          </div>
        </div>
        <div className="bottom_container_pokemondetails">
          <p className="header_pokemondetails">description</p>
          <p>{pokemonDetails?.pokedexEntry}</p>
          <p className="header_pokemondetails">Physics</p>
          <ul style={{ margin: 0, listStyle: "none" }}>
            <li>height: {pokemonDetails?.height} m</li>
            <li>weight: {moveDecimalPoint(pokemonDetails?.weight)} kg</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PokemonDetails;
