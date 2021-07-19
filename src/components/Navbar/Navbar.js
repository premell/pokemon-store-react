import { cart as cartAtom } from "../../atoms";
import { useRecoilState } from "recoil";

import { FaShoppingCart } from "react-icons/fa";

import SearchBar from "./SearchBar";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  return (
    <div>
      <SearchBar />
      <Link to="/Cart">
        <FaShoppingCart />
      </Link>
    </div>
  );
};

export default Navbar;
