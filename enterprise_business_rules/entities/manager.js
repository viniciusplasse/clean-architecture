const { Schema, model } = require('mongoose')

const managerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
        index: true,
    }
})

module.exports = model('Manager', managerSchema)
