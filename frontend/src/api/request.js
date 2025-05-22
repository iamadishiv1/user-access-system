import axios from 'axios';

const API_URL = '/api/requests';

const createReuest = (softwareId, accessType, reason, token) => {
    return axios.post(API_URL, {
        softwareId,
        accessType,
        reason
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getPendingRequests = (token) => {
    return axios.get(`${API_URL}/pending`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const updateRequestStatus = (id, status, token) => {
    return axios.patch(`${API_URL}/${id}`, {
        status
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getMyRequests = (token) => {
    return axios.get(`${API_URL}/my-requests`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const requestsApi = {
  createReuest,
  getPendingRequests,
  updateRequestStatus,
  getMyRequests
};

export default requestsApi;