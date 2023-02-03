const axios = require('axios');

export const addCollection = (data) => {
    return axios.post(process.env.urlPoint + '/collection/add', data, {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    })
}

export const getMyCollections = (data) => {
    return axios.get(process.env.urlPoint + '/collection/getMyCollections', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const getCollectionInfo = (data) => {
    return axios.get(process.env.urlPoint + '/collection/getCollectionInfo', { params: data })
}

export const getExploreCollection = (data) => {
    return axios.get(process.env.urlPoint + '/collection/getExploreCollection', { params: data })
}

export const updateCollection = (data) => {
    return axios.post(process.env.urlPoint + '/collection/update', data, {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    })
}

export const deleteCollection = (data) => {
    return axios.delete(process.env.urlPoint + '/collection/delete', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    })
}