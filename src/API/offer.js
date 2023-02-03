const axios = require('axios');

export const createOffer = (data) => {
    return axios.post(process.env.urlPoint + '/offer/createOffer', data, {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const getOffersByTokenId = (data) => {
    return axios.get(process.env.urlPoint + '/offer/getOffersByTokenId', { params: data })
        .then(resp => resp.data)
}

export const cancelOfferByCreator = (data) => {
    return axios.delete(process.env.urlPoint + '/offer/cancelOfferByCreator', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const getAcceptOfferRaw = (data) => {
    return axios.get(process.env.urlPoint + '/offer/acceptOffer', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const getBuyingByOfferRaw = (data) => {
    return axios.get(process.env.urlPoint + '/offer/buyByOffer', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}