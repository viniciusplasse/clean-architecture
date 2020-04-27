const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25,
    },
    description: {
        type: String,
        maxlength: 140,
    },
    price: {
        type: Number,
        required: true,
        max: 99999,
        min: 0.99,
    },
},
{
    timestamps: true,
})

module.exports = model('Product', productSchema)
