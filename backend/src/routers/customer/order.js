/**
 * @author yashkasera
 * Created 08/10/21 at 9:33 PM
 */

const express = require('express');
const auth = require("../../middlewares/customerAuth");
const {NotFoundError, StoreNotVerifiedError, BadRequestError} = require("../../util/errorHandler");
const Order = require("../../models/order");
const router = new express.Router();
const Seller = require("../../models/seller");
const Review = require("../../models/review");
const {ResourceUpdatedSuccess} = require("../../util/successHandler");

router.get('/customer/order', auth, async (req, res) => {
    try {
        const order =
            await Order
                .find({customer: req.customer._id})
                .limit(parseInt(req.query.limit))
                .populate('seller', 'name username storeName')
                .sort({createdAt: -1})
        if (order) return res.send(order)
        return res.status(400).send(new BadRequestError())
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message))
    }
})

router.get('/customer/order/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({orderId: req.params.id})
            .populate('seller', 'verified username storeDescription storeName image createdAt views')
        if (order) {
            if (order.expiresAt < new Date())
                throw new BadRequestError("Link Expired!");
            if (order.status === 'CANCELLED')
                throw new BadRequestError("Order Cancelled!");
            if (order.customer && order.customer.toString() !== req.customer._id.toString())
                throw new BadRequestError("Order fulfilled by other customer");
            if (!order.seller.verified) return res.status(401).send(new StoreNotVerifiedError());
            return res.send(order)
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        console.log(e)
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.delete('/customer/order/:id', auth, async (req, res) => {
    try {
        await Order.findOneAndUpdate({orderId: req.params.id}, {
            customerId: req.customer._id,
            status: 'CANCELLED'
        })
        return res.send(new ResourceUpdatedSuccess());
    } catch (e) {
        return res.send(new BadRequestError());
    }
})

module.exports = router;