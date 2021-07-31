import "./Cart.css";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { cart as cartAtom } from "../../atoms";
import Navbar from "../../components/Navbar/Navbar";

import CartList from "./CartList.js";
import Header from "./Header";

const formatNumberWithCommas = (number) => {
  if (typeof number !== "number") return 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [sortingMethod, setSortingMethod] = useState({
    method: "",
    type: "",
    arrowDirection: "",
  });
  const [nameSorting, setNameSorting] = useState("");
  const [priceSorting, setPriceSorting] = useState("");

  const removePokemon = (pokemonToRemove) => {
    const updatedPokemon = cart.pokemon.filter(
      (pokemon) => pokemon.name !== pokemonToRemove.name
    );
    const updatedPrice = cart.total - pokemonToRemove.price;
    const normalizedPrice = updatedPrice <= 0 ? 0 : updatedPrice;
    setCart({ pokemon: updatedPokemon, total: normalizedPrice });
  };

  useEffect(() => {
    console.log(cart.total);
  }, [cart]);

  useEffect(() => {
    let sortedPokemon = [...cart.pokemon];
    if (sortingMethod.method !== "") {
      switch (sortingMethod.method) {
        case "ALPHABETICALLY_A_FIRST":
          sortedPokemon.sort((a, b) => (a.name > b.name ? 1 : -1));
          break;
        case "ALPHABETICALLY_Z_FIRST":
          sortedPokemon.sort((a, b) => (a.name < b.name ? 1 : -1));
          break;
        case "PRICE_HIGHEST_FIRST":
          sortedPokemon.sort((a, b) => (a.price < b.price ? 1 : -1));
          break;
        case "PRICE_LOWEST_FIRST":
          sortedPokemon.sort((a, b) => (a.price > b.price ? 1 : -1));
          break;
        default:
      }
    }
    setCart({ ...cart, pokemon: sortedPokemon });
  }, [sortingMethod]);

  return (
    <div className="main_container_cart">
      <Navbar />
      <div className="pokemon_container_cart">
        <Header
          sortingMethod={sortingMethod}
          nameSorting={nameSorting}
          priceSorting={priceSorting}
          setPriceSorting={setPriceSorting}
          setNameSorting={setNameSorting}
          setSortingMethod={setSortingMethod}
        />
        <CartList removePokemon={removePokemon} cartPokemons={cart.pokemon} />
      </div>
      <p>{formatNumberWithCommas(cart?.total)}</p>
    </div>
  );
};

export default Cart;
