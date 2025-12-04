import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null;
  if (!movieResults) return null;

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Recommended for You
      </h2>

      <div className="flex flex-col gap-10">
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName.trim()}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
