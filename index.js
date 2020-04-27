const Express = require("./frameworks_and_drivers/web/express")
const Mongoose = require("./frameworks_and_drivers/database/mongoose")

const database = Mongoose.connect()
const server = Express.start()

module.exports = { database, server }
