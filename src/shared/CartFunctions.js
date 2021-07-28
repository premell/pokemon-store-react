import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { cart as cartAtom } from "../atoms";
import { popupMessage as popupMessageAtoms } from "../atoms";

export const useAddToCart = (pokemon) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);
  console.log(pokemon);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setPopupMessage((popupMessage) => ({ ...popupMessage, show: false }));
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [popupMessage]);

  const newcart = {
    pokemon: [...cart.pokemon, pokemon],
    total: cart.total + pokemon.price,
  };
  setCart(newcart);

  const newpopupmessage = {
    message: `${pokemon.name} added to cart`,
    show: true,
    type: "positive",
  };
  setPopupMessage(newpopupmessage);
};
export default useAddToCart;

// export default const usedeletefromcart = () => {
//   const newcartpokemon =
//       cart.pokemon.filter((cartpokemon) => cartpokemon.name !==
//       pokemon.name);
//   const newtotal = cart.total - pokemon.price;
//   setcart({pokemon : newcartpokemon, total : newtotal});
//
//   const newpopupmessage = {
//     message : `${pokemon.name} removed from cart`,
//     show : true,
//     type : "negative",
//   };
//   setpopupmessage(newpopupmessage);
// };
// }

// import {useeffect} from "react";

// import {userecoilstate} from "recoil";
//
// import {cart as cartatom} from "../atoms";
// import {popupmessage as popupmessageatoms} from "../atoms";
//
// const cartfunctions = {
//   const [cart, setcart] = userecoilstate(cartatom);
//   const [popupmessage, setpopupmessage] = userecoilstate(popupmessageatoms);
//
//   console.log(pokemon);
//
//   const addtocart =
//       () => {
//         const newcart = {
//           pokemon : [...cart.pokemon, pokemon ],
//           total : cart.total + pokemon.price,
//         };
//         setCart(newCart);
//
//         const newPopupMessage = {
//           message : `${pokemon.name} added to cart`,
//           show : true,
//           type : "positive",
//         };
//         setPopupMessage(newPopupMessage);
//       };
//
//   const deleteFromCart =
//       () => {
//         const newCartPokemon = cart.pokemon.filter(
//             (cartPokemon) => cartPokemon.name !== pokemon.name);
//         const newTotal = cart.total - pokemon.price;
//         setCart({pokemon : newCartPokemon, total : newTotal});
//
//         const newPopupMessage = {
//           message : `${pokemon.name} removed from cart`,
//           show : true,
//           type : "negative",
//         };
//         setPopupMessage(newPopupMessage);
//       };
//
//   useEffect(
//       () => {
//         const timeId = setTimeout(() => {
//           setPopupMessage((popupMessage) => ({...popupMessage, show :
//           false}));
//         }, 3000);
//         return () => { clearTimeout(timeId); };
//       },
//       [ popupMessage ]);
// };
//
// export default CartFunctions;
