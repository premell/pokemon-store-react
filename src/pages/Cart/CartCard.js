import { Link } from "react-router-dom";
import "./Cart.css";
const CartCard = ({ pokemon, removePokemon }) => {
  return (
    <div className="card_container_cart_card">
      <Link
        to={{
          pathname: `/pokemon/${pokemon.name}`,
          state: { pokemon: pokemon },
        }}
      >
        <img className="image_cart" src={pokemon.image} />
      </Link>
      <p className="name_cart_card">{pokemon.name}</p>
      <p className="price_cart_card">{pokemon.price}</p>
      <div className="remove_cart_card" onClick={() => removePokemon(pokemon)}>
        REMOVE
      </div>
    </div>
  );
};

export default CartCard;
