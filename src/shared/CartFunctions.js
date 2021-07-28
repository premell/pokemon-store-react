import {useEffect} from "react";
import {useRecoilState} from "recoil";

import {cart as cartAtom} from "../atoms";
import {popupMessage as popupMessageAtoms} from "../atoms";

const [cart, setCart] = useRecoilState(cartAtom);
const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);

useEffect(() => {

          })

export default const useTest =
    () => {

    }
// export default const useDeleteFromCart = () => {
//   const newCartPokemon =
//       cart.pokemon.filter((cartPokemon) => cartPokemon.name !==
//       pokemon.name);
//   const newTotal = cart.total - pokemon.price;
//   setCart({pokemon : newCartPokemon, total : newTotal});
//
//   const newPopupMessage = {
//     message : `${pokemon.name} removed from cart`,
//     show : true,
//     type : "negative",
//   };
//   setPopupMessage(newPopupMessage);
// };
// }

// import {useEffect} from "react";

// import {useRecoilState} from "recoil";
//
// import {cart as cartAtom} from "../atoms";
// import {popupMessage as popupMessageAtoms} from "../atoms";
//
// const CartFunctions = {
//   const [cart, setCart] = useRecoilState(cartAtom);
//   const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);
//
//   console.log(pokemon);
//
//   const addToCart =
//       () => {
//         const newCart = {
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
