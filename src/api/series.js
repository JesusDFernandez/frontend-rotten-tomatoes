import axios from "./axios";

export const getSeriesRequest = async (page) => axios.get(`/series/page/${page}`);

export const getSerieRequest = async (id) => axios.get(`/series/${id}`);

export const getSerieVideoRequest = async (id) => axios.get(`/series/video/${id}`);

export const getSerieFilterRequest = async (filter) => axios.post(`/series/filter/`, filter);

export const getSerieGenreRequest = async () => axios.get(`/series/genres/`);