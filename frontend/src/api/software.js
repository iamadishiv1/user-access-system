import axios from "axios";

const API_URL = '/api/software';

const createSoftware = (name, description, accessLevels, token) => {
    return axios.post(API_URL, {
        name,
        description,
        accessLevels
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getAllSoftware = (token) => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


const softwareApi = {
  createSoftware,
  getAllSoftware
};

export default softwareApi;