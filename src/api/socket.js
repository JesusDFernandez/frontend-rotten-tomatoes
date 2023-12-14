import io from 'socket.io-client';
import { API_URL_SOCKET } from "../config"

const socket = io(API_URL_SOCKET);

export default socket;