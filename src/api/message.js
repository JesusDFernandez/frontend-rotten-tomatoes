import axios from "./axios";

export const getMessageRequest = async (id) => axios.get(`/message/${id}`);

export const getMessageLastRequest = async (id) => axios.get(`/message/last/${id}`);
