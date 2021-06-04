class ObjFactory {
    constructor() {
        // if (process.env.DB_TYPE === 'MONGODB') {
        //     const DBUtil = require('./mongo/dbUtils')
        //     this.dbUtils = new DBUtil()
        // } else {
        //     throw ('This appliaction support only MONGODB.')
        // }
        this.dbUtils = require('./database/dbmysql/dbUtiles')
        this.nbaSiteUtil = require('./utils/nbaSiteUtil')
        this.fileParser = require('./utils/csvUtil')
    }

    getDBUtils() {
        return this.dbUtils
    }
}

module.exports = new ObjFactory()