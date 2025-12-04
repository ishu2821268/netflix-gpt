import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useFeaturedMovies from "../hooks/useFeaturedMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useFeaturedMovies();

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Header />

      <main className="pt-16 md:pt-20">
        {showGptSearch ? (
          <section className="min-h-[calc(100vh-4rem)]">
            <GptSearch />
          </section>
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )}
      </main>
    </div>
  );
};

export default Browse;
