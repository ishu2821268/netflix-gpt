import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  const key = trailerVideo?.key;

  const src = key
    ? `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${key}`
    : "";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {key ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          title="Movie Trailer"
          style={{ objectFit: "cover" }}
          src={src}
          allow="autoplay; encrypted-media"
        ></iframe>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Loading trailer...
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
