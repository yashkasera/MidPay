/**
 * @author yashkasera
 * Created 03/10/21 at 11:49 PM
 */
const express = require('express');
const router = new express.Router();
const Seller = require('../../models/seller');
const Review = require('../../models/review');
const auth = require("../../middlewares/customerAuth");
const {NotFoundError, BadRequestError} = require("../../util/errorHandler");
const {ResourceCreatedSuccess, ResourceUpdatedSuccess, ResourceDeletedSuccess} = require("../../util/successHandler");
const {ObjectId} = require("mongodb");

router.get('/review/:sellerId', async (req, res) => {
    try {
        const reviews = await Review.find({seller: req.params.sellerId})
        if (reviews)
            return res.send(reviews);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError());
    }
})

router.post('/review/:sellerId', auth, async (req, res) => {
    const temp = await Review.findOne({customer: req.customer._id, seller: req.params.sellerId})
    if (temp) return res.status(400).send(new BadRequestError("You've already reviewed this seller!"));
    const review = new Review(req.body);
    review.customerName = req.customer.name;
    review.customer = req.customer._id;
    review.seller = req.params.sellerId;
    try {
        await review.save();
        await updateSellerRating(req.params.sellerId);
        return res.status(201).send(new ResourceCreatedSuccess(review));
    } catch (e) {
        return res.status(404).send(new BadRequestError(e.message));
    }
})

const updateSellerRating = async (sellerId) => {
    await Review.aggregate([{
            $match: {seller: ObjectId(sellerId)}
        },
            {
                $group: {
                    _id: sellerId,
                    'r5': {
                        $sum: {
                            $cond: [{"$eq": ["$rating", 5]}, 1, 0]
                        }
                    },
                    'r4': {
                        $sum: {
                            $cond: [{"$eq": ["$rating", 4]}, 1, 0]
                        }
                    },
                    'r3': {
                        $sum: {
                            $cond: [{"$eq": ["$rating", 3]}, 1, 0]
                        }
                    },
                    'r2': {
                        $sum: {
                            $cond: [{"$eq": ["$rating", 2]}, 1, 0]
                        }
                    },
                    'r1': {
                        $sum: {
                            $cond: [{"$eq": ["$rating", 1]}, 1, 0]
                        }
                    },
                }
            }
        ], async (err, result) => {
            if (result && result.length > 0) {
                let total = 0
                total += 5 * result[0].r5
                total += 4 * result[0].r4
                total += 3 * result[0].r3
                total += 2 * result[0].r2
                total += 1 * result[0].r1
                const reviewCount = (result[0].r5 + result[0].r4 + result[0].r3 + result[0].r2 + result[0].r1)
                await Seller.findByIdAndUpdate(ObjectId(sellerId), {
                    storeRating: reviewCount !== 0 ? (total / reviewCount) : 0
                })
            }
        }
    );
}

router.get('/review/myReviews', auth, async (req, res) => {
    try {
        const reviews = await Review.find({customerId: req.customer._id});
        if (reviews)
            return res.send(reviews);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        res.status(404).send(new NotFoundError());
    }
})

router.patch('/review/:id', auth, async (req, res) => {
    try {
        const allowedUpdates = ["rating", "review"];
        const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({error: 'Invalid updates!'})
        }
        const review = await Review.findById(ObjectId(req.params.id));
        if (review) {
            Object.keys(req.body).forEach(update => {
                review[update] = req.body[update]
            });
            await review.save()
            await updateSellerRating(review.sellerId);
            return res.send(new ResourceUpdatedSuccess(review));
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.delete('/review/:id', auth, async (req, res) => {
    try {
        await Review.findByIdAndDelete(ObjectId(req.params.id));
        return res.send(new ResourceDeletedSuccess());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

module.exports = router;