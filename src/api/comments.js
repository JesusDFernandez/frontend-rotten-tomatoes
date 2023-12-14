import axios from "./axios";

export const getCommentsRequest = async (movieId, parentId) => axios.get(`/comments/?movieId=${movieId}&parentId=${parentId}`);

export const createCommentRequest = async (comment) => axios.post("/comments", comment);
