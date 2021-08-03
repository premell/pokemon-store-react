import { IconContext } from "react-icons";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import MyLinks from "../../shared/MyLinks/MyLinks";

import { cart as cartAtom } from "../../atoms";

import NavbarCss from "./Navbar.module.css";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  return (
    <div className={NavbarCss.main_container}>
      <Link to="/">
        <div className={NavbarCss.title_container}>
          <p className={NavbarCss.title}>Pokemon Trader</p>
        </div>
      </Link>
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
      <div className={NavbarCss.links}>
        <MyLinks size={35} />
      </div>
    </div>
  );
};

export default Navbar;
