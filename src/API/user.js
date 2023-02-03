const axios = require('axios');

export const connectUser = (data) => {
    return axios.post(process.env.urlPoint + '/profile/connect', data, {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const updateUser = (data) => {
    return axios.post(process.env.urlPoint + '/profile/update', data, {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const getBalanceUser = (data) => {
    return axios.get(process.env.urlPoint + '/profile/getBalanceUser', {
        headers: {
            authorization: localStorage.getItem('Authorization')
        },
        params: data
    }).then(resp => resp.data)
}

export const getUserInfo = (data) => {
    return axios.get(process.env.urlPoint + '/profile/userInfo', { params: data })
        .then(resp => resp.data)
}