/**
 * @author yashkasera
 * Created 10/10/21 at 12:14 AM
 */
const express = require('express');
const auth = require("../../middlewares/customerAuth");
const {BadRequestError} = require("../../util/errorHandler");
const Issue = require("../../models/issue");
const Order = require("../../models/order");
const router = new express.Router();

router.get('/customer/dashboard', auth, async (req, res) => {
    try {
        const issueCount = await Issue.find({customer: req.customer._id}).countDocuments();
        const orderCount = await Order.find({customer: req.customer._id}).countDocuments();
        return res.send({
            issueCount,
            orderCount,
            name:req.customer.name,
            email:req.customer.email,
            notificationCount:0,
            chatCount:0,
        });
    } catch (e) {
        return res.status(404).send(new BadRequestError(e.message));
    }
})

module.exports = router