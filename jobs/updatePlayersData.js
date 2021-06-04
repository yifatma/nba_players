const cron = require('node-cron')
const _ = require('lodash')
const dbUtils = require('../objFactory').dbUtils
const nbaSiteUtil = require('../objFactory').nbaSiteUtil


const updateData = async function updateData() {
    const playersList = await dbUtils.selectAllPlayers()
    console.log(`running a task every minute`)

    await Promise.all(playersList.map(async (player) => {
        const sitePlayer = await nbaSiteUtil.getPlayer(player.id)
        sitePlayer.data.team_id = sitePlayer.data.team.id
        const teamData = sitePlayer.data.team
        delete sitePlayer.data['team']

        if (!_.isEqual(sitePlayer.data, _.assign({}, player))) {
            if (sitePlayer.data.team_id != player.team_id)
                await dbUtils.updateOnDupTeams(teamData)

            await dbUtils.updatePlayer(sitePlayer.data)
            console.log(`ID ${sitePlayer.data.id} NOT equal`)
        }
    }))
}

cron.schedule('* * * * *', updateData)

