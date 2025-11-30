import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  // Accept `movie` object or direct poster path
  const posterPath = movie?.poster_path ?? movie;
  const title = movie?.original_title ?? movie?.title ?? "";

  if (!posterPath) return null;

  return (
    <div
      className="relative cursor-pointer rounded-md overflow-hidden 
                 transform transition duration-300 hover:scale-105 hover:z-20"
      style={{ width: "150px" }}   // medium and aesthetic
    >
      {/* Poster */}
      <img
        src={IMG_CDN_URL + posterPath}
        alt={title || "Movie Poster"}
        className="
          w-[150px] h-[220px]        /* mobile */
          md:w-[170px] md:h-[250px]  /* tablet */
          lg:w-[190px] lg:h-[280px]  /* desktop */
          object-cover block
        "
        onError={(e) => {
          e.target.src =
            'https://via.placeholder.com/300x450?text=No+Image';
        }}
      />

      {/* Bottom fade overlay */}
      <div className="absolute left-0 right-0 bottom-0 px-3 py-2 
                      bg-gradient-to-t from-black/85 via-black/50 to-transparent
                      text-white flex flex-col gap-1">
        
        <div className="text-xs md:text-sm font-semibold line-clamp-1">
          {title}
        </div>

        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300">
          <span className="px-1.5 py-0.5 bg-white/10 rounded">HD</span>
          <span>⭐ {movie?.vote_average ?? "--"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

