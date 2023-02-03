const axios = require('axios');

export const login = (data) => {
    return axios.post(process.env.urlPoint + '/api/login', data)
}
