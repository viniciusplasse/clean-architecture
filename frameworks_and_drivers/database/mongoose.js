const mongoose = require('mongoose')
const env = process.env.NODE_ENV
const config = require("../../config")[env]

class Mongoose {
  static connect() {
    mongoose.connect(config.database.uri, config.database.options)

    return mongoose
  }
}

module.exports = Mongoose
