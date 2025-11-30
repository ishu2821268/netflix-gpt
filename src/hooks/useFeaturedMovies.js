import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

import { useDispatch } from "react-redux";
import { addFeaturedMovies } from "../utils/moviesSlice";

const useFeaturedMovies = () => {
  const dispatch = useDispatch();

  const getFeaturedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addFeaturedMovies(json.results));
  };

  useEffect(() => {
    getFeaturedMovies();
  }, []);
};

export default useFeaturedMovies;
