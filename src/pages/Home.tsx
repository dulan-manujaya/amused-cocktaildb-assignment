import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Layout from "../components/Layout";
import CocktailCard from "../components/CocktailCard";
import ICocktail from "../interfaces/CocktailInterface";
import { fetchRandomCocktail } from "../services/CocktailAPI";
import { cocktailsAtom } from "../atoms/cocktailsAtom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { filteredCocktailsSelector } from "../selectors/filteredSelector";

export default function Home() {
  const [cocktails, setCocktails] = useRecoilState(cocktailsAtom);
  const filteredCocktails = useRecoilValue(filteredCocktailsSelector);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  async function fetchCocktails(length: number, isRefreshing = false) {
    console.log("fetching");
    setIsFetching(true);

    const tempCocktails = isRefreshing ? [] : [...cocktails];

    if (tempCocktails.length >= length) {
      setIsFetching(false);
      return;
    }

    const promises = Array.from({ length }, fetchRandomCocktail);
    const results = await Promise.all(promises);

    setIsFetching(false);

    results.forEach((result: { drinks: ICocktail[] }) => {
      const { idDrink } = result.drinks[0];
      const isCocktailExists = tempCocktails.some(
        (cocktail) => cocktail.idDrink === idDrink
      );
      if (!isCocktailExists) {
        tempCocktails.push(result.drinks[0]);
      } else {
        fetchCocktails(1);
      }
    });

    setCocktails(tempCocktails);
  }

  useEffect(() => {
    if (cocktails.length === 0) {
      fetchCocktails(5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {isFetching ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 my-8" />
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          <button
            className="flex items-center justify-center text-sm sm:text-base rounded-full font-medium transition-colors text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 my-2"
            onClick={() => fetchCocktails(5, true)}
          >
            <ArrowPathIcon className="h-6 w-6 text-white mr-4" />
            Refresh
          </button>

          <div className="flex flex-wrap items-center justify-center">
            {filteredCocktails.map((cocktail) => (
              <CocktailCard cocktail={cocktail} key={cocktail.idDrink} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
