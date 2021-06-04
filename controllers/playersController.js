const fs = require('fs')
const nbaSiteUtil = require('../objFactory').nbaSiteUtil
const fileParser = require('../objFactory').fileParser

const { URL_NUMBER_OF_PLAYERS,
    PLAYER_FILE_NAME,
    PLAYER_FILE_SUFFIX,
    PLAYER_FILE_PATH } = require('../constants')


module.exports = function (app) {

    app.get('/player', async function (req, res) {
        try {
            const timestamp = Date.now()
            const fileFullName = `${PLAYER_FILE_PATH}/${PLAYER_FILE_NAME}_${timestamp}.${PLAYER_FILE_SUFFIX}`

            const response = await nbaSiteUtil.getNBAPlayers()

            const result = await fileParser.parsePlayerResult(response.data)

            fs.writeFile(fileFullName, result, function writeFile(err) {
                if (err) throw err
                res.download(fileFullName)
            })

        } catch (err) {
            const status = err.status ? err.status : 500
            res.status(status).send(err)
            throw err
        }
    })


}

