import axios from 'axios';

const scorecardApi = axios.create({
    baseURL: 'http://localhost:5001/api/ScorecardResults',
});

export const createScorecard = (ScorecardInfo) => scorecardApi.post('/', ScorecardInfo);

export const updateScorecard = (id, ScorecardInfo) => scorecardApi.put(`/${id}`, ScorecardInfo);

export const deleteScorecard = (id) => scorecardApi.delete(`/${id}`);

export const scoreCardResults = (id, pid) => scorecardApi.get(`/${id}/${pid}`);