import { atom } from "recoil";
import ICocktail from "../interfaces/CocktailInterface";

export const cocktailsAtom = atom({
  key: "cocktailsAtom",
  default: [] as ICocktail[],
});

export const favouritesAtom = atom({
  key: "favouritesAtom",
  default: [] as ICocktail[],
});
