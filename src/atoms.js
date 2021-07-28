import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const pokemons = atom({ key: "pokemons", default: [] });

export const cart = atom({ key: "cart", default: { pokemon: [], total: 0 } });

export const searchValue = atom({ key: "searchValue", default: "" });

export const popupMessage = atom({
  key: "popupMessage",
  default: {
    show: false,
    message: "hello",
    type: "positive",
  },
});
