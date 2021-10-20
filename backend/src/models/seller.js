const mongoose = require('mongoose')
const {sendOTPEmail} = require('../util/email')
const Float = require('mongoose-float')
const SellerLog = require("./sellerLog");
const {ObjectId} = require("mongodb");

const schema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Float,
        default: 0
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    website: {
        type: String
    },
    instagramUsername: {
        type: String
    },
    panNo: {
        type: String,
        required: false
    },
    storeLogo: {
        type: String,
    },
    storeName: {
        type: String,
        required: true
    },
    storeDescription: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    storeRating: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    revenue: {
        type: Float,
        default: 0
    },
    enabled: {
        type: Boolean,
        default: true
    },
    address: {
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },
    image: String,
    views: {
        type: Number,
        default: 0
    },
    otp: Number
}, {
    timestamps: true
})

schema.virtual('review', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'sellerId'
})

schema.virtual('issue', {
    ref: 'Issue',
    localField: '_id',
    foreignField: 'sellerId'
})

schema.index({
    name:'text',
    username:'text',
    instagramUsername:'text',
    category:'text',
    storeName: 'text'
})

schema.pre('save', async function (next) {
    const doc = this
    if (this.isNew) {
        const log = new SellerLog({
            seller: ObjectId(doc._id),
            description: "Seller Signed Up",
            action: "CREATE",
        })
        await log.save();
    } else if (this.isModified()) {
        const log = new SellerLog({
            seller: ObjectId(doc._id),
            description: "Updated Profile",
            action: "UPDATE",
        })
        await log.save();
    }
    next();
})

schema.methods.toJSON = function () {
    const seller = this
    const sellerOBJ = seller.toObject()
    delete sellerOBJ.token
    delete sellerOBJ.revenue
    delete sellerOBJ.firebaseUid
    delete sellerOBJ.updatedAt
    delete sellerOBJ.enabled
    delete sellerOBJ.address
    delete sellerOBJ.panNo
    delete sellerOBJ.balance
    return sellerOBJ
}

schema.methods.generateOTP = async function () {
    const seller = this
    const OTP = (Math.floor(Math.random() * 1000000)) + 1304
    await sendOTPEmail(seller.email, OTP)
    seller.otp = OTP
    await seller.save()
    setTimeout(async () => {
        seller.otp = null
        await seller.save()
    }, 1000 * 10 * 60)
}

const seller = mongoose.model('Seller', schema)


module.exports = seller
