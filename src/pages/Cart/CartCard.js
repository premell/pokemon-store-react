import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./Cart.css";
import formatAsUSD from "../../shared/formatAsUSD.js";
const CartCard = ({ pokemon, removePokemon }) => {
  return (
    <div className="card_container_cart_card">
      <Link
        to={{
          pathname: `/pokemon/${pokemon.name}`,
          state: { pokemon: pokemon },
        }}
      ></Link>
      <div className="image_cart">
        <img src={pokemon.image} />
      </div>
      <p className="name_cart_card">{pokemon.name}</p>
      <p className="price_cart_card">{formatAsUSD(pokemon.price)}</p>
      <div className="remove_cart_card" onClick={() => removePokemon(pokemon)}>
        <RiDeleteBin6Line size={20} className="bin_icon_cart" />
      </div>
    </div>
  );
};

export default CartCard;
