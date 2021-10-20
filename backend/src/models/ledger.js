const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose);
const Account = require('./account')
const schema = new mongoose.Schema({
    description: String,
    order: {
        type: String,
        ref: 'Order'
    },
    seller: {
        type: String,
        required: true,
        ref: 'Seller'
    },
    extra: {
        type: String
    },
    entryType: {
        type: String,
        required: true,
        enum: ['Cr', 'Dr']
    },
    amount: {
        type: Float,
        required: true
    },
    balance: {
        type: Float,
        required: true
    },
    note: String,
}, {
    timestamps: true
})

const Ledger = mongoose.model('Ledger', schema)

module.exports = Ledger

