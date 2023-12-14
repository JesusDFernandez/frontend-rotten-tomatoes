import axios from "./axios";

export const createGroupRequest = async (group) => axios.post("/group", group);

export const getGroupsRequest = async () => axios.get("/group");

export const getGroupRequest = async (id) => axios.get(`/group/${id}`);
