const axios = require('axios')
const { URL_NUMBER_OF_PLAYERS } = require('../constants')

const getNBAPlayers = async function getNBAPlayers() {
    try {
        return axios({
            method: 'get',
            url: `https://www.balldontlie.io/api/v1/players?per_page=${URL_NUMBER_OF_PLAYERS}`,
            responseType: 'json'
        })
    } catch (e) {
        console.log(`Error when retrieve data from NBA site: ${e}`)
        throw e
    }
}

module.exports = {
    getNBAPlayers
}