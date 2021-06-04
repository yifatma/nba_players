const express = require('express')
const playersController = require('./controllers/playersController')
const dbUtils = require('./objFactory').dbUtils
const dbFacade = require('./database/dbFacade')
const updatePlayersJob = require('./jobs/updatePlayersData')


const app = express()

const port = process.env.PORT || 3000

playersController(app)

const initDB = new Promise(async (resolve, reject) => {
    await dbUtils.createSchema()
    await dbFacade.initData()
    resolve()
})

initDB.then(async () => {
    console.log(`CreateDB Schema `)
    console.log(`Server is listen on port ${port}`)
    app.listen(port)
})


//fastcsv
//axios
//agenda
