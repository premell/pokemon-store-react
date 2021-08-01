import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { cart as cartAtom } from "../../atoms";
import { popupMessage as popupMessageAtoms } from "../../atoms";
import formatAsUSD from "../../shared/formatAsUSD.js";
import TypeFlair from "../../shared/TypeFlair/TypeFlair";

import PokemonCardCss from "./PokemonCard.module.css";

const PokemonCard = ({ pokemon }) => {
  const { name, image, price, types } = pokemon;
  const [cart, setCart] = useRecoilState(cartAtom);

  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);

  const addToCart = () => {
    const newCart = {
      pokemon: [...cart.pokemon, pokemon],
      total: cart.total + price,
    };
    setCart(newCart);

    const newPopupMessage = {
      message: `${pokemon.name} added to cart`,
      show: true,
      type: "positive",
    };
    setPopupMessage(newPopupMessage);
  };

  const deleteFromCart = () => {
    const newCartPokemon = cart.pokemon.filter(
      (cartPokemon) => cartPokemon.name !== name
    );
    const newTotal = cart.total - price;
    setCart({ pokemon: newCartPokemon, total: newTotal });

    const newPopupMessage = {
      message: `${pokemon.name} removed from cart`,
      show: true,
      type: "negative",
    };
    setPopupMessage(newPopupMessage);
  };

  useEffect(() => {
    if (popupMessage.show === true) {
      const timeId = setTimeout(() => {
        setPopupMessage((popupMessage) => ({ ...popupMessage, show: false }));
      }, 3000);
      return () => {
        clearTimeout(timeId);
      };
    }
  }, [popupMessage]);

  return (
    <div className={PokemonCardCss.container}>
      <Link
        className={PokemonCardCss.clickable_container}
        to={{
          pathname: `/pokemon/${pokemon.name}`,
          state: { pokemon: pokemon },
        }}
      >
        <img src={image} />
        <span className={PokemonCardCss.name}> {name}</span>
        <div>
          {types.map((type) => (
            <TypeFlair key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </Link>
      <h3>{formatAsUSD(price)}</h3>
      {cart.pokemon.find((cartPokemon) => cartPokemon.name === name) ===
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
