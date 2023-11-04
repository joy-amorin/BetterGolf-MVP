import axios from 'axios';

const playersApi = axios.create({
	baseURL: 'http://localhost:5100/api/Players',
});

export const getAllPlayers = () => playersApi.get('/');

export const getPlayerById = (id) => playersApi.get(`/${id}`);

export const createPlayer = (player) => playersApi.post('/', player);

export const deletePlayer = (id) => playersApi.delete(`/${id}`);

export const updatePlayer = (id, player) => playersApi.put(`/${id}`, player);
