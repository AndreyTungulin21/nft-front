const axios = require('axios');

export const createNFT = (data) => {
    return axios.post(process.env.urlPoint + '/nft/create', data, {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    })
}

export const updateNFT = (data) => {
    return axios.post(process.env.urlPoint + '/nft/update', data, {
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    })
}

export const deleteNFT = (data) => {
    return axios.delete(process.env.urlPoint + '/nft/delete', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    })
}

export const getNFTs = ({ queryKey, pageParam = 1 }) => {
    const [query, where, perPage] = queryKey

    return axios.get(process.env.urlPoint + '/nft/getNFTs',
        { params: { query, perPage, where, currentPage: pageParam } })
        .then(resp => resp.data.data)
}

export const getNFTInfo = (data) => {
    return axios.get(process.env.urlPoint + '/nft/getNFTInfo', { params: data })
}

export const getNFTActivity = (data) => {
    return axios.get(process.env.urlPoint + '/nft/getNFTActivity', { params: data })
}


export const getMintTxRaw = (data) => {
    return axios.get(process.env.urlPoint + '/nft/mint', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const getSaleTxRaw = (data) => {
    return axios.get(process.env.urlPoint + '/nft/sale', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}

export const getBuyTxRaw = (data) => {
    return axios.get(process.env.urlPoint + '/nft/buy', {
        params: data,
        headers: {
            authorization: localStorage.getItem('Authorization')
        }
    }).then(resp => resp.data)
}