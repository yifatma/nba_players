class ObjFactory {
    constructor() {
        // if (process.env.DB_TYPE === 'MONGODB') {
        //     const DBUtil = require('./mongo/dbUtils')
        //     this.dbUtils = new DBUtil()
        // } else {
        //     throw ('This appliaction support only MONGODB.')
        // }
        this.dbUtils = require('./database/dbmysql/dbUtiles')
    }

    getDBUtils() {
        return this.dbUtils
    }
}

module.exports = new ObjFactory()