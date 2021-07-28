import CartCard from "./CartCard.js";
const CartList = ({ cartPokemons }) => {
  console.log(cartPokemons);
  return (
    <div>
      {cartPokemons.map((pokemon) => (
        <CartCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default CartList;
