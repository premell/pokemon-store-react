import "./Cart.css";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";

import { searchValue as searchValueAtoms } from "../../atoms";
import { cart as cartAtom } from "../../atoms";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import formatAsUSD from "../../shared/formatAsUSD.js";

import CartList from "./CartList.js";
import Header from "./Header";

const formatNumberWithCommas = (number) => {
  if (typeof number !== "number") return 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Cart = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);
  const [cart, setCart] = useRecoilState(cartAtom);
  const [initialLoad, setInitialLoad] = useState(true);
  const [sortingMethod, setSortingMethod] = useState({
    method: "",
    type: "",
    arrowDirection: "",
  });
  const [nameSorting, setNameSorting] = useState("");
  const [priceSorting, setPriceSorting] = useState("");

  const [buttonText, setButtonText] = useState("proceed to checkout");

  const button = useRef(null);

  // let history = useHistory();

  const removePokemon = (pokemonToRemove) => {
    const updatedPokemon = cart.pokemon.filter(
      (pokemon) => pokemon.name !== pokemonToRemove.name
    );
    const updatedPrice = cart.total - pokemonToRemove.price;
    const normalizedPrice = updatedPrice <= 0 ? 0 : updatedPrice;
    setCart({ pokemon: updatedPokemon, total: normalizedPrice });
  };

  //   useEffect(() => {
  //     if (initialLoad) {
  //       setSearchValue("");
  //       setInitialLoad(false);
  //       console.log(searchValue);
  //       console.log(searchValue !== "");
  //       return;
  //     }
  //
  //     console.log(searchValue);
  //     console.log(searchValue !== "");
  //     if (searchValue !== "") history.push("/");
  //   }, [searchValue]);

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

  const handleMouseOver = () => setButtonText("not implemented");
  const handleMouseLeave = () => setButtonText("proceed to checkout");
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
      <div className="checkout_price_cart">
        <p>total: {formatAsUSD(cart?.total)}</p>
        {cart.pokemon.length !== 0 && (
          <div
            onMouseLeave={handleMouseLeave}
            onMouseOver={handleMouseOver}
            className="proceed_button_cart"
          >
            {buttonText}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
