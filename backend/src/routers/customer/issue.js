/**
 * @author yashkasera
 * Created 03/10/21 at 11:56 PM
 */
const express = require('express');
const auth = require("../../middlewares/customerAuth");
const {NotFoundError, BadRequestError} = require("../../util/errorHandler");
const Customer = require("../../models/customer");
const Issue = require("../../models/issue");
const {ResourceCreatedSuccess, ResourceUpdatedSuccess} = require("../../util/successHandler");
const {nanoid} = require("nanoid");
const Order = require("../../models/order");
const router = new express.Router();

router.get('/customer/issue', auth, async (req, res) => {
    try {
        const issues = await Issue.find({customer: req.customer._id})
        if (issues)
            return res.send(issues);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
});

function dayDiff(d1, d2) {
    const t2 = d2.getTime();
    const t1 = d1.getTime();
    return parseInt((t2 - t1) / (24 * 3600 * 1000));
}

router.get('/customer/issue/recentOrders', auth, async (req, res) => {
    try {
        const temp =
            await Order
                .find({
                    customer: req.customer._id,
                    status: {
                        $in: ['PAID', 'DELIVERED']
                    },
                    createdAt: {$gt: new Date().setDate(new Date().getDate() - 30)}
                })
                .limit(3)
                .populate('seller', 'name username')
                .sort({createdAt: -1})
        const orders = await Promise.all(
            temp.map(async (order) => {
                const issue = await Issue.findOne({order: order.orderId})
                if (!issue)
                    return order;
                return null
            })
        )
        const result = orders.filter((order) => order !== null)
        if (result && result.length > 0) return res.send(result)
        return res.status(400).send(new BadRequestError())
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message))
    }
})


router.get('/customer/issue/try/:id', auth, async (req, res) => {
    try {
        const issue = await Issue.findOne({order: req.params.id})
        if (issue) return res.status(404).send(new BadRequestError('An Issue already exists for given order id!'))
        const order = await Order.findOne({orderId: req.params.id}).populate('seller', 'username storeName')
        if (order.status === 'COMPLETED' || order.status === 'REFUNDED') return res.status(400).send('Order already processed!')
        if (dayDiff(new Date(order.createdAt), new Date()) >= 30)
            return res.status(400).send('Issue cannot be raised after 30 days!');
        return res.send(order)
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.post('/customer/issue', auth, async (req, res) => {
    try {
        const issue = new Issue(req.body);
        issue.issueId = nanoid(10)
        issue.customer = req.customer._id;
        issue.status = "RAISED"
        await issue.save();
        await Order.findOneAndUpdate({orderId: req.body.orderId}, {status: 'ISSUE'})
        return res.send(new ResourceCreatedSuccess());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.patch('/customer/issue/:id', auth, async (req, res) => {
    try {
        const issue = await Issue.findOne({issueId: req.params.id})
        if (issue) {
            const allowedUpdates = ["title", "description", "image"];
            const isValidOperation =
                Object.keys(req.body).every((update) =>
                    allowedUpdates.includes(update));
            if (!isValidOperation) {
                return res.status(400).send({error: 'Invalid updates!'})
            }
            Object.keys(req.body).forEach(update => {
                issue[update] = req.body[update]
            });
            issue.save();
            return res.send(new ResourceUpdatedSuccess())
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})
module.exports = router;