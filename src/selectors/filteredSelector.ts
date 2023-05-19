import { selector } from "recoil";

import { cocktailsAtom, favouritesAtom } from "../atoms/cocktailsAtom";
import { searchAtom } from "../atoms/searchAtom";

import ICocktail from "../interfaces/CocktailInterface";

const filteredCocktailsSelector = selector({
  key: "filteredCocktailsSelector",
  get: ({ get }) => {
    const cocktails = get(cocktailsAtom);
    const search = get(searchAtom);

    if (search === "") {
      return cocktails;
    } else {
      return cocktails.filter((cocktail: ICocktail) => {
        return cocktail.strDrink.toLowerCase().includes(search.toLowerCase());
      });
    }
  },
});

const filteredFavouritesSelector = selector({
  key: "favouritesSelector",
  get: ({ get }) => {
    const favourites = get(favouritesAtom);
    const search = get(searchAtom);

    if (search === "") {
      return favourites;
    } else {
      return favourites.filter((favourite: ICocktail) => {
        return favourite.strDrink.toLowerCase().includes(search.toLowerCase());
      });
    }
  },
});

export { filteredCocktailsSelector, filteredFavouritesSelector };
