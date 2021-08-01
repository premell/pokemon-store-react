import CartCard from "./CartCard.js";
import "./Cart.css";
const CartList = ({ cartPokemons, removePokemon }) => {
  console.log(cartPokemons);

  return (
    <div>
      {cartPokemons.length === 0 ? (
        <div className="empty_message_cart_list">Your cart is empty</div>
      ) : (
        cartPokemons.map((pokemon) => (
          <CartCard
            key={pokemon.name}
            removePokemon={removePokemon}
            pokemon={pokemon}
          />
        ))
      )}
    </div>
  );
};

export default CartList;
