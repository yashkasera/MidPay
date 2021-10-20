/**
 * @author yashkasera
 * Created 03/10/21 at 06:37 PM
 */
const express = require('express');
const auth = require("../../middlewares/sellerAuth");
const Payment = require("../../models/payment");
const Order = require("../../models/order");
const {ObjectId} = require("mongodb");
const {NotFoundError} = require("../../util/errorHandler");
const router = new express.Router();

router.get('/seller/payments', auth, async (req, res) => {
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate);
    endDate.setDate(endDate.getDate() + 1);
    console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
    await Order.aggregate([{
        $match: {
            seller: ObjectId(req.seller._id),
            updatedAt: {
                $gt: startDate,
                $lt: endDate
            },
            status: {
                $in: ['COMPLETED', 'PAID']
            },
        }
    }, {
        $group: {
            _id: req.seller._id,
            // count:{$sum: '$amount'}
            'paid': {
                $sum: {$cond: {if: {$eq: ['$status', 'PAID']}, then: '$amount', else: 0}}
            },
            'completed': {
                $sum: {$cond: {if: {$eq: ['$status', 'COMPLETED']}, then: '$amount', else: 0}}
            },
        }
    }], async (error, result) => {
        if (result && result.length > 0) {
            const payments =
                await Order.find({
                    seller: req.seller._id,
                    status: ['COMPLETED', 'PAID'],
                    updatedAt: {
                        $gt: startDate,
                        $lt: endDate
                    }
                })
                    .sort({updatedAt: -1})
                    .populate('customer', 'name');
            return res.send({
                payments,
                paidTotal: result[0].paid,
                completedTotal: result[0].completed,
            })
        } else if (error) {
            return res.status(404).send(new NotFoundError(error.message));
        }
        return res.send({
            payments: [],
            paidTotal: 0,
            completedTotal: 0,
        })
    })
})

module.exports = router;