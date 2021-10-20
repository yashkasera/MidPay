const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
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

const CustomerLog = mongoose.model('CustomerLog', schema)

module.exports = CustomerLog

