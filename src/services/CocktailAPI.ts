import Axios from "./Axios";

const fetchRandomCocktail = async () => {
  const { data } = await Axios.get("/random.php");
  return data;
};

export { fetchRandomCocktail };
