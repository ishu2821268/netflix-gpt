import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BANNER_IMAGE } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="banner-img"
          src={BANNER_IMAGE}
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      </div>

      <div className="relative z-10 pt-32 md:pt-40 max-w-4xl mx-auto px-4 md:px-6">
        <GptSearchBar />

        <div className="mt-8 md:mt-12">
          <GptMovieSuggestions />
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
