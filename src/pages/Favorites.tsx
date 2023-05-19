import { useRecoilValue } from "recoil";
import CocktailCard from "../components/CocktailCard";
import Layout from "../components/Layout";

import { filteredFavouritesSelector } from "../selectors/filteredSelector";

export default function Favorites() {
  const favorites = useRecoilValue(filteredFavouritesSelector);

  return (
    <Layout>
      {favorites.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">No Favorites</div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center">
          {favorites.map((cocktail) => (
            <CocktailCard cocktail={cocktail} key={cocktail.idDrink} />
          ))}
        </div>
      )}
    </Layout>
  );
}
