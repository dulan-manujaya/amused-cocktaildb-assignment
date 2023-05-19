import { useRecoilState } from "recoil";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import ICocktail from "../interfaces/CocktailInterface";
import { favouritesAtom } from "../atoms/cocktailsAtom";

type Props = {
  cocktail: ICocktail;
};

export default function CocktailCard({ cocktail }: Props) {
  const [favourites, setFavourites] = useRecoilState(favouritesAtom);

  function checkIfFavourite() {
    return favourites.some(
      (favourite) => favourite.idDrink === cocktail.idDrink
    );
  }

  function manageFavourites() {
    if (checkIfFavourite()) {
      setFavourites((oldFavourites) =>
        oldFavourites.filter(
          (favourite) => favourite.idDrink !== cocktail.idDrink
        )
      );
    } else {
      setFavourites((oldFavourites) => [...oldFavourites, cocktail]);
    }
  }

  return (
    <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg px-10 py-4 max-w-xs m-2 flex flex-col items-center justify-center">
      <img
        className="mb-3 w-64 h-64 rounded-full shadow-lg mx-auto"
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
      />
      <h1 className="text-lg text-gray-700" title={cocktail.strDrink}>
        {
          //truncate the name of the cocktail if it's too long
          cocktail.strDrink.length > 20
            ? cocktail.strDrink.substring(0, 20) + "..."
            : cocktail.strDrink
        }{" "}
      </h1>
      <p className="text-sm text-gray-500 mb-3">{cocktail.strCategory}</p>

      <button
        className={`${
          checkIfFavourite()
            ? "bg-red-600 hover:bg-red-800"
            : "bg-indigo-600 hover:bg-indigo-800"
        } px-4 py-2 mt-4 rounded-3xl text-gray-100 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300`}
        onClick={manageFavourites}
      >
        {checkIfFavourite() ? "Remove from favourites" : "Add to favourites"}
        {checkIfFavourite() ? (
          <HeartIconSolid className="h-4 w-4 text-gray-100 ml-2" />
        ) : (
          <HeartIcon className="h-4 w-4 text-gray-100 ml-2" />
        )}
      </button>
    </div>
  );
}
