class ObjFactory {
    constructor() {
        this.dbUtils = require('./database/dbmysql/dbUtiles')
        this.nbaSiteUtil = require('./utils/nbaSiteUtil')
        this.fileParser = require('./utils/csvUtil')
    }
}

module.exports = new ObjFactory()