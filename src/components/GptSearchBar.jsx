import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { API_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const ai = OPENAI_KEY ? new GoogleGenAI({ apiKey: OPENAI_KEY }) : null;

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results || [];
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current?.value?.trim();

    if (!query) return;

    if (!ai) {
      console.error("Gemini client not initialized. Check OPENAI_KEY env.");
      return;
    }

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query: " +
      query +
      ". Only give me the names of 5 movies, comma separated. Example Result: Gadar, Sholay, Don, Koi Mil Gaya, Golmaal.";

    try {
      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: gptQuery,
      });

      const text =
        typeof res.text === "function"
          ? await res.text()
          : res.text || res.response?.text?.() || "";

      const gptMovies = text
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (err) {
      console.error("Error in GPT search:", err);
    }
  };

  return (
    <div className="w-full flex justify-center pt-24 md:pt-28">
      <form
        className="w-[90%] max-w-3xl bg-black/70 border border-white/10 rounded-2xl shadow-xl 
                   grid grid-cols-12 overflow-hidden backdrop-blur-sm"
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearchClick();
        }}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-8 md:col-span-9 px-4 md:px-6 py-3 md:py-4 
                     bg-transparent text-white placeholder:text-gray-400 
                     text-sm md:text-base outline-none"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />

        <button
          type="submit"
          className="col-span-4 md:col-span-3 flex items-center justify-center
                     bg-red-700 hover:bg-red-600 text-white font-semibold 
                     text-sm md:text-base px-4 md:px-6 py-3 md:py-4
                     transition-colors duration-200"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
