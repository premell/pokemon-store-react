import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const pokemons = atom({ key: "pokemons", default: [] });
export const allPokemonNames = atom({ key: "allPokemonNames", default: [] });

export const cart = atom({ key: "cart", default: { pokemon: [], total: 0 } });
