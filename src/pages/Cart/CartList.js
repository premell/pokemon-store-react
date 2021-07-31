import CartCard from "./CartCard.js";
const CartList = ({ cartPokemons, removePokemon }) => {
  return (
    <div>
      {cartPokemons.map((pokemon) => (
        <CartCard
          key={pokemon.name}
          removePokemon={removePokemon}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};

export default CartList;
