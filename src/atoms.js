import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const pokemons = atom({ key: "pokemons", default: [] });

const consoleLog = (value) => console.log(value);

export const searchValue = atom({ key: "searchValue", default: "" });

export const recentlyRedirectedBecauseTyping = atom({
  key: "recentlyRedirectedBecauseTyping ",
  default: false,
});

export const popupMessage = atom({
  key: "popupMessage",
  default: {
    show: false,
    message: "hello",
    type: "positive",
  },
});

export const cart = atom({
  key: "cart",
  default: {
    pokemon: [],
    total: 0,
  },
});
