import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { cart as cartAtom } from "../../atoms";
import formatAsUSD from "../../shared/formatAsUSD.js";
import TypeFlair from "../../shared/TypeFlair/TypeFlair";

import PokemonCardCss from "./PokemonCard.module.css";

const PokemonCard = ({ pokemon }) => {
  const { name, image, price, types } = pokemon;
  const [cart, setCart] = useRecoilState(cartAtom);
  const addToCart = () => {
    const newCart = {
      pokemon: [...cart.pokemon, pokemon],
      total: cart.total + price,
    };
    console.log(newCart);
    setCart(newCart);
  };

  const deleteFromCart = () => {
    const newCartPokemon = cart.pokemon.filter(
      (cartPokemon) => cartPokemon.name !== name
    );
    console.log(newCartPokemon);
    const newTotal = cart.total - price;
    setCart({ newCartPokemon, newTotal });
  };

  return (
    <div className={PokemonCardCss.container}>
      <div className={PokemonCardCss.clickable_container}>
        <img src={image} />
        <h4 className={PokemonCardCss.name}> {name}</h4>
        <div>
          {types.map((type) => (
            <TypeFlair key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </div>
      <h3>{formatAsUSD(price)}</h3>
      {cart?.pokemon.find((cartPokemon) => cartPokemon.name === name) ===
      undefined ? (
        <div onClick={() => addToCart()} className={PokemonCardCss.add_button}>
          add to cart
        </div>
      ) : (
        <div
          onClick={() => deleteFromCart()}
          className={PokemonCardCss.delete_button}
        >
          remove from cart
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
