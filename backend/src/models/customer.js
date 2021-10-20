const mongoose = require('mongoose')
const Float = require('mongoose-float')
const {ObjectId} = require("mongodb");
const CustomerLog = require("./customerLog");
const randomColor = require('randomcolor');

const schema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    gender: {
        type: String,
        trim: true,
        enum: ['m', 'f', 'o'],
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    color:{
        type:String,
        default: randomColor.randomColor({
            luminosity: 'light',
        })
    },
    wallet: {
        type: Float,
        default: 0
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    instagramUsername: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

schema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customer'
})

schema.virtual('reviews', {
    ref: 'Customer',
    localField: '_id',
    foreignField: 'customer'
})

schema.virtual('issues', {
    ref: 'Issue',
    localField: '_id',
    foreignField: 'customer'
})

schema.virtual('chats', {
    ref: 'Chat',
    localField: '_id',
    foreignField: 'customer'
})

schema.pre('save', async function (next) {
    const doc = this
    if (this.isNew) {
        const log = new CustomerLog({
            customer: ObjectId(doc._id),
            description: "Customer Signed Up",
            action: "CREATE",
        })
        await log.save();
    } else if (this.isModified()) {
        const log = new CustomerLog({
            customer: ObjectId(doc._id),
            description: "Updated Profile",
            action: "UPDATE",
        })
        await log.save();
    }
    next();
})

const Customer = mongoose.model('Customer', schema)

module.exports = Customer
