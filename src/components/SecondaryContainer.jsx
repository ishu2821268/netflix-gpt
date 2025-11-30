import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies?.nowPlayingMovies) return null;

  // You can replace these categories with real category arrays later.
  const sections = [
    { title: "Now Playing Movies", items: movies.nowPlayingMovies },
    { title: "Popular Movies", items: movies.popularMovies },
    { title: "Top-Rated Movies", items: movies.topRatedMovies },
    { title: "Featured Movies", items: movies.featuredMovies },
  ];

  return (
    <section className="bg-black pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-12 space-y-10">
        {sections.map((s) => (
          <MovieList key={s.title} title={s.title} movies={s.items} />
        ))}
      </div>
    </section>
  );
};

export default SecondaryContainer;
