/**
 * @author yashkasera
 * Created 04/10/21 at 1:14 PM
 */
const express = require('express');
const auth = require("../../middlewares/customerAuth");
const Order = require("../../models/order");
const router = new express.Router();
const crypto = require('crypto');
const {BadRequestError, NotFoundError, StoreNotVerifiedError} = require("../../util/errorHandler");
const {verifySignature} = require("../../util/razorpay");
const Payment = require("../../models/payment");
const {ResourceCreatedSuccess} = require("../../util/successHandler");

router.get('/payment/try/:id', auth, async (req, res) => {
    try {
        const order = await Order
            .findOne({orderId: req.params.id})
            .populate('seller', 'verified instagramUsername username storeDescription storeName image createdAt views')
        if (order) {
            // if (order.payment !== null || order.status ==='PAID' )
            //     throw new BadRequestError("Order has been already Paid!")
            // if (order.expiresAt < new Date()){}
            //     throw new BadRequestError("Link Expired!");
            // if (order.status === 'CANCELLED')
            //     throw new BadRequestError("Order Cancelled!");
            // if (order.customer && order.customer.toString() !== req.customer._id.toString())
            //     throw new BadRequestError("Order fulfilled by other customer");
            // if (!order.seller.verified) return res.status(401).send(new StoreNotVerifiedError());
            return res.send(order)
        }
        return res.status(400).send(new BadRequestError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.post('/payment/:id', auth, async (req, res) => {
    try {
        console.log(req.body)
        if (verifySignature(req.body.razorpay_order_id, req.body.razorpay_payment_id, req.body.razorpay_signature)) {
            const order = await Order.findOne({orderId: req.params.id})
            order.customer = req.customer._id;
            const payment = new Payment(req.body);
            payment.status = "PAID";
            order.status = "PAID";
            payment.orderId = req.params.id;
            payment.amount = order.amount;
            order.payment = payment._id;
            await order.save();
            await payment.save();
            return res.send(new ResourceCreatedSuccess());
        } else
            throw new Error("Cannot Verify Payment Integrity")
    } catch (e) {
        console.log(e)
        return res.status(400).send(new BadRequestError(e.message))
    }
})

router.get("/payments", auth, async (req, res) => {
    try {
        const payments = await Order.find({customerId: req.customer._id})
        if (payments)
            return res.send(payments)
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message))
    }
});

module.exports = router;