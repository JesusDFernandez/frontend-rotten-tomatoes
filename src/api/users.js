import axios from "./axios";

export const getUserAllRequest = async () => axios.get(`/usersAll/`);

export const getUsersTodosRequest = async () => axios.get(`/usersTodos/`);

export const getUserRequest = async () => axios.get(`/users/`);

export const updateUserRequest = async (users) => axios.put(`/users/`, users);

export const deleteUserRequest = async () => axios.delete(`/users/`);