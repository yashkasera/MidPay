const express = require('express');
const router = new express.Router();
const Order = require('../../models/order');
const Seller = require('../../models/seller');
const auth = require('../../middlewares/sellerAuth');
const {route} = require("express/lib/router");
const {SchemaValidationError, NotFoundError, BadRequestError} = require("../../util/errorHandler");
const {ResourceCreatedSuccess, ResourceDeletedSuccess} = require("../../util/successHandler");
const {createOrder} = require("../../util/razorpay");
const {nanoid} = require("nanoid");
const Shipping = require("../../models/shipping");

router.get('/seller/order', auth, async (req, res) => {
    try {
        const orders = await Order.find({seller: req.seller._id}).sort({createdAt: -1})
        if (orders)
            return res.send(orders);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
});

router.get('/seller/order/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order)
            return res.send(order)
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message))
    }
})

router.post('/seller/order', auth, async (req, res) => {
    const order = new Order(req.body);
    order.orderId = nanoid(10);
    order.amount = parseFloat(req.body.amount);
    order.status = 'CREATED';
    order.seller = req.seller._id
    await createOrder(order);
    try {
        await order.save();
        return res.send(new ResourceCreatedSuccess(order));
    } catch (e) {
        return res.status(400).send(new SchemaValidationError(e.message))
    }
})


// TODO: 04/10/2021 12:07 PM
router.patch('/seller/order/:id', auth, async (req, res) => {
    try {
        const order = await Order.findOne({orderId: req.params.id})
        if (order != null)
            return res.send(order)
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message))
    }
})

router.patch('/seller/order/:id/shipping', auth, async (req, res) => {
    try {
        const order = await Order.findOne({orderId: req.params.id})
        if (order != null) {
            const shipping = new Shipping(req.body);
            await shipping.save()
            order.shipping = shipping._id;
            order.save();
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message))
    }
})

router.delete('/seller/order/:id', auth, async (req, res) => {
    try {
        if (await Order.findOneAndDelete({orderId: req.params.id}))
            return res.send(new ResourceDeletedSuccess());
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})
module.exports = router