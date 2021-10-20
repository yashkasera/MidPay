const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    description: String,
    entity: String,
    action: {
        type: String,
        enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN'],
    },
    entityId: String,
}, {
    timestamps: true
})

const SellerLog = mongoose.model('SellerLog', schema)

module.exports = SellerLog

