import axios from 'axios';

const API_URL = '/api/auth';

const signup = (username, password, role) => {
    return axios.post(`${API_URL}/signup`, {
        username,
        password,
        role
    },{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};


const login = (username, password) => {
    return axios.post(`${API_URL}/login`, {
        username,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const authApi = {
  signup,
  login,
  logout
};

export default authApi;