const mongoose = require('mongoose')
const Float = require('mongoose-float')
const {nanoid} = require("nanoid");
const SellerLog = require("./sellerLog");
const {ObjectId} = require("mongodb");
const CustomerLog = require("./customerLog");

const schema = new mongoose.Schema({
    issueId: {
        type: String,
        default: nanoid(10),
        unique: true
    },
    order: {
        type: String,
        ref: 'Order',
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ["RAISED", "VIEWED", "RESOLVED", "REFUNDED"],
        default: "RAISED"
    }
}, {
    timestamps: true
})
schema.pre('save', async function (next) {
    const doc = this
    if (this.isNew) {
        const log = new CustomerLog({
            customer: ObjectId(doc.customer),
            description: "New Issue Raised",
            action: "CREATE",
            entity: 'Issue',
            entityId: doc.issueId,
        })
        await log.save();
    } else if (this.isModified('status') && this.status === 'RESOLVED') {
        const log = new SellerLog({
            seller: ObjectId(doc.seller),
            description: "Resolved Issue",
            action: "UPDATE",
            entity: 'Issue',
            entityId: doc.issueId,
        })
        await log.save();
    } else if (this.isModified('status') && this.status === 'REFUNDED') {
        const log = new SellerLog({
            seller: ObjectId(doc.seller),
            description: "Created a Refund",
            action: "UPDATE",
            entity: 'Issue',
            entityId: doc.issueId,
        })
        await log.save();
    } else if (this.isModified('status') && this.status === 'VIEWED') {
        //do nothing
    } else if (this.isModified()) {
        const log = new CustomerLog({
            customer: ObjectId(doc.customer),
            description: "Updated Issue Details",
            action: "UPDATE",
            entity: 'Issue',
            entityId: doc.issueId,
        });
        await log.save();
    }
    next();
})
const Issue = mongoose.model('Issue', schema)

module.exports = Issue
