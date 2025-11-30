import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[8];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden">

      {/* Background Trailer */}
      <VideoBackground movieId={id} />

      {/* Top-to-bottom cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

      {/* Content Title + Buttons */}
      <div className="absolute bottom-10 md:bottom-20 left-6 md:left-16 max-w-2xl text-white drop-shadow-xl">
        <VideoTitle title={original_title} overview={overview} />
      </div>
      
    </div>
  );
};

export default MainContainer;

