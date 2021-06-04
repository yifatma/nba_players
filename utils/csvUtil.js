var jsonexport = require('jsonexport')

const parsePlayerResult = async function parsePlayerResult(res) {
    try {
        return jsonexport(res.data)
    } catch (e) {
        console.log(`Error when parsing csv file: ${e}`)
        throw e
    }
}


module.exports = {
    parsePlayerResult
}
