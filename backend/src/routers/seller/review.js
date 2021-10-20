/**
 * @author yashkasera
 * Created 03/10/21 at 06:58 PM
 */
const express = require('express');
const router = new express.Router();
const Review = require('../../models/review');
const auth = require("../../middlewares/sellerAuth");
const {NotFoundError, BadRequestError} = require("../../util/errorHandler");
const {ObjectId} = require("mongodb");

router.get('/seller/reviews', auth, async (req, res) => {
    try {
        const reviews = await Review.find({seller: req.seller._id}).populate('customer', 'name');
        if (reviews)
            return res.send(reviews);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.get('/seller/ratings', auth, async (req, res) => {
    try {
        await Review.aggregate([{
                $match: {seller: ObjectId(req.seller._id)}
            },
                {
                    $group: {
                        _id: req.seller._id,
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
                if (err) return res.status(400).send(err.message)
                else if (result && result.length > 0) {
                    let total = 0
                    total += 5 * result[0].r5
                    total += 4 * result[0].r4
                    total += 3 * result[0].r3
                    total += 2 * result[0].r2
                    total += 1 * result[0].r1
                    const reviewCount = (result[0].r5 + result[0].r4 + result[0].r3 + result[0].r2 + result[0].r1)
                    res.send({
                        overallRating: total / reviewCount,
                        storeRatings: result[0],
                        reviewCount,
                    })
                } else if (result.length === 0) {
                    return res.send({
                        overallRating: 0,
                        storeRatings: {
                            r1: 0, r2: 0, r3: 0, r4: 0, r5: 0
                        },
                    })
                }
            }
        );
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})


module.exports = router;