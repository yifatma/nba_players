const cron = require('node-cron')

const updateData = async function updateData() {
    console.log('running a task every minute111')
}

cron.schedule('* * * * *', updateData)

