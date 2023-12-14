import axios from "./axios";

export const getChatsRequest = async () => axios.get("/chats");

export const getChatRequest = async (id) => axios.get(`/chat/${id}`);

export const createChatRequest = async (chat) => axios.post("/chat", chat);