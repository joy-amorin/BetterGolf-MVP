// Used to make calls to the backend for courses
import axios from 'axios';

const courseApi = axios.create({
	baseURL: 'http://localhost:5100/api/Holes',
});


export const updateHoles = (id, holes) => courseApi.put(`/${id}`, holes);
export const deleteHoles = (id) => courseApi.delete(`/${id}`);
export const getHolesById = (id) => courseApi.delete(`/${id}`);
