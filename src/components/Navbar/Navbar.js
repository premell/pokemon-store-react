import { IconContext } from "react-icons";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { cart as cartAtom } from "../../atoms";

import NavbarCss from "./Navbar.module.css";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  return (
    <div className={NavbarCss.main_container}>
      <h3>Pokemon Trader</h3>
      <SearchBar />
      <Link to="/Cart">
        <IconContext.Provider
          value={{
            style: { color: "black", cursor: "pointer" },
          }}
        >
          <div className={NavbarCss.cart_container}>
            <FiShoppingCart size={30} />
            <div className={NavbarCss.cart_index}>{cart.pokemon.length}</div>
          </div>
        </IconContext.Provider>
      </Link>
    </div>
  );
};

export default Navbar;
