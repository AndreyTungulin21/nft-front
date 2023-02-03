const axios = require('axios');


export const getHome = (data) => {
    return axios.get(process.env.urlPoint + '/main/homeInfo').then(resp => resp.data)
}

export const checkUniqueInfoByType = (data) => {
    return axios.get(process.env.urlPoint + '/main/checkUniqueInfoByType', {
        headers: {
            authorization: localStorage.getItem('Authorization')
        },
        params: data
    })
}