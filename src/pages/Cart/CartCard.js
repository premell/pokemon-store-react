const CartCard = ({ pokemon }) => {
  return (
    <div>
      <img src={pokemon.image} />
      <p>{pokemon.name}</p>
      <p>{pokemon.price}</p>
      <div>REMOVE</div>
    </div>
  );
};

export default CartCard;
