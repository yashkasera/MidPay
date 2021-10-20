const mongoose = require('mongoose')
const Float = require('mongoose-float')
const {nanoid} = require("nanoid");
const SellerLog = require("./sellerLog");
const {ObjectId} = require("mongodb");
const CustomerLog = require("./customerLog");
const schema = new mongoose.Schema({
    orderId: {
        type: String,
        default: nanoid(10)
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
    status: {
        type: String,
        enum: ['CREATED', 'PAID', 'SHIPPED', 'DELIVERED', 'ISSUE', 'CANCELLED', 'REFUNDED', 'COMPLETED'],
        default: 'CREATED',
    },
    amount: {
        type: Float,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shipping: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping',
        default: undefined,
    },
    expiresAt: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 2)
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: undefined
    },
    razorpay_order_id: String
}, {
    timestamps: true
})

schema.virtual('issue', {
    ref: 'Issue',
    localField: 'orderOd',
    foreignField: 'order'
})

schema.pre('save', async function (next) {
    const doc = this
    if (this.isNew) {
        const log = new SellerLog({
            seller: ObjectId(doc.seller),
            description: "New Order Created",
            action: "CREATE",
            entity: 'Order',
            entityId: doc.orderId,
        })
        await log.save();
    } else if (this.isModified('status') && this.status === 'PAID') {
        const log = new CustomerLog({
            customer: ObjectId(doc.customer),
            description: "Paid for Order",
            action: "CREATE",
            entity: 'Order',
            entityId: doc.orderId,
        })
        await log.save();
    } else if (this.isModified()) {
        const log = new SellerLog({
            seller: ObjectId(doc.seller),
            description: "Updated Order Details",
            action: "UPDATE",
            entity: 'Order',
            entityId: doc.orderId,
        });
        await log.save();
    }
    next();
})

const Order = mongoose.model('Order', schema)
module.exports = Order