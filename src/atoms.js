import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const pokemons = atom({ key: "pokemons", default: [] });
