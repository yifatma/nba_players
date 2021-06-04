// const mysql = require('mysql')
const mysql = require('mysql2/promise')
const _ = require('lodash')
const dbSchema = require('./schema')

const createConnection = async function createConnection() {
  try {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    })

  } catch (e) {
    console.log(`Error: ${e}`)
    throw e
  }
}

const createSchema = async function createSchema() {

  const con = await createConnection()
  try {
    await con.connect()
    await con.query(dbSchema.teamsTable)
    await con.query(dbSchema.playersTable)

  } catch (e) {
    console.log(`Error: ${e}`)
    throw e
  } finally {
    await con.end()
  }
}

const extractTeamList = function extractTeamAList(dataArr) {
  const values = []
  const teams = _.chain(dataArr)
    .map('team')
    .uniqBy('id')
    .value()

  teams.forEach(item => {
    values.push(
      [item.id,
      item.abbreviation,
      item.city,
      item.conference,
      item.division,
      item.full_name,
      item.name])
  })
  return values
}
const extractPlayerList = function extractPlayerAList(dataArr) {
  const values = []

  dataArr.forEach(item => {

    values.push(
      [item.id,
      item.first_name,
      item.last_name,
      item.position,
      item.height_feet,
      item.height_inches,
      item.weight_pounds,
      item.team.id])
  })
  return values
}

const initSchema = async function initSchema(dataArr) {
  const con = await createConnection()

  try {
    await con.connect()
    const rows = await con.query('select * from teams')

    if (rows[0].length > 0)
      return

    await con.query(dbSchema.insetTeamRow, [extractTeamList(dataArr)])
    await con.query(dbSchema.insetPlayerRow, [extractPlayerList(dataArr)])
    await con.commit()

  } catch (e) {
    await con.rollback()
    console.log(`Error: ${e}`)

  } finally {
    await con.end()
  }
}


module.exports = {
  createConnection,
  createSchema,
  initSchema
}