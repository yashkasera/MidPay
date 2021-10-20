const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    review: String,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Seller'
    }
}, {
    timestamps: true
})

const Review = mongoose.model('Review', schema)

module.exports = Review