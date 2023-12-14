import { createContext, useContext, useState } from "react";
import { getMovieFilterRequest, getMovieGenreRequest, getMovieRequest, getMoviesRequest, getMovieVideoRequest } from "../api/movies";

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) throw new Error("usemovies must be used within a movieProvider");
  return context;
};

export function MoviesProvider({ children }) {

  const [movies, setMovies] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMovies = async (page = 1) => {
    const res = await getMoviesRequest(page);

    if (movies.results) {
      setMovies({ results: [...movies.results, ...res.data.results] });

    } else {
      setMovies(res.data);

    }

    setLoading(false);
  };

  const getMovieVideo = async (id) => {
    const res = await getMovieVideoRequest(id);
    return res.data;
  };

  const getMovie = async (id) => {
    try {
      const res = await getMovieRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getMovieFilter = async (filter) => {
    try {

      const res = await getMovieFilterRequest(filter);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const getMovieGenre = async () => {
    try {

      const res = await getMovieGenreRequest();
      return res.data;

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <MovieContext.Provider
      value={{
        movies,
        refresh,
        loading,
        getMovies,
        setMovies,
        getMovie,
        getMovieFilter,
        getMovieVideo,
        getMovieGenre
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
