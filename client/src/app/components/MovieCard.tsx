/* eslint-disable @next/next/no-img-element */
interface Movie {
  Poster: string;
  Title: string;
  Year: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 w-64 h-88 p-4">
        <img className="w-full h-88 object-cover" src={movie.Poster} alt={movie.Title} />
        <div className="p-4 bg-gray-300">
          <h3 className="text-lg font-semibold">{movie.Title}</h3>
          <p className="text-gray-500">{movie.Year}</p>
          <button
            className="mt-2 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors duration-200"
          >
            Buy
          </button>
        </div>
      </div>
    );
  }
  