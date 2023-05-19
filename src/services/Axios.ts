import axios from "axios";

const Axios = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
