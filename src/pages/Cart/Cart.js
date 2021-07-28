import { cart as cartAtom } from "../../atoms";
import { useRecoilState } from "recoil";

import CartList from "./CartList.js";
const Cart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);
  return (
    <div>
      <CartList cartPokemons={cart.pokemon} />
      <p>{cart.total}</p>
    </div>
  );
};

export default Cart;
