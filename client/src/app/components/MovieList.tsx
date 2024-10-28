import MovieCard from './MovieCard';

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
}

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
    {movies.map(movie => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))}
  </div>
  );
}
