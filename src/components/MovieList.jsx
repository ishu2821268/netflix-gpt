import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies = [] }) => {
  const rowRef = useRef(null);

  const scroll = (dir = "right") => {
    const el = rowRef.current;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.8);
    const to =
      dir === "right" ? el.scrollLeft + amount : el.scrollLeft - amount;
    el.scrollTo({ left: to, behavior: "smooth" });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative px-6 mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          aria-label="scroll left"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/75 text-white shadow"
        >
          ‹
        </button>
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto pb-3 scroll-smooth hide-scrollbar px-2 md:px-6"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0"
              style={{ width: "auto" }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          aria-label="scroll right"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/75 text-white shadow"
        >
          ›
        </button>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default MovieList;
