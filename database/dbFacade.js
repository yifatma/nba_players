const axios = require('axios')
const objFactory = require('../objFactory')
const { URL_NUMBER_OF_PLAYERS } = require('../constants')
const nbaSiteUtil = require('../utils/nbaSiteUtil')


const initData = async function initData() {

    try {
        const response = await nbaSiteUtil.getNBAPlayers()
        const dbUtil = objFactory.getDBUtils()
        await dbUtil.initSchema(response.data.data)

    } catch (err) {
        const status = err.status ? err.status : 500
        throw err
    }

}

// const handlePlayerResult = async function handlePlayerResult(data) {
//     const dbUtil = objFactory.getDBUtils()
//     await dbUtil.initSchema(data)
// }

module.exports = {
    initData
}