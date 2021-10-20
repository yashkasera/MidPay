const mongoose = require('mongoose')
const Float = require('mongoose-float')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ['admin', 'seller', 'customer']
    },
    balance: {
        type: Float,
        default: 0
    }
}, {timestamps: true})

const Account = mongoose.model('Account', schema)

module.exports = Account