const mongoose = require('mongoose');
const Float = require('mongoose-float');
const schema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED', 'RECEIVED'],
        default: 'PENDING'
    },
    razorpay_payment_id: String,
    razorpay_order_id: String,
    razorpay_signature: String,
    amount: {
        required: true,
        type: Float
    }
}, {
    timestamps: true
})

const Payment = mongoose.model('Payment', schema)

module.exports = Payment
