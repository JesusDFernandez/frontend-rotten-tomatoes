import axios from "./axios";

export const getMoviesRequest = async (page) => axios.get(`/movies/page/${page}`);

export const getMovieRequest = async (id) => axios.get(`/movies/${id}`);

export const getMovieVideoRequest = async (id) => axios.get(`/movies/video/${id}`);

export const getMovieFilterRequest = async (filter) => axios.post(`/movies/filter/`, filter);

export const getMovieGenreRequest = async () => axios.get(`/movies/genres`);


export const getQueryFilterRequest = async (filter) => axios.post(`/search/`, filter);
