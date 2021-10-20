const express = require("express");
const router = new express.Router();
const Seller = require('../../models/seller')
const Review = require('../../models/review')
const {NotFoundError} = require("../../util/errorHandler");
const {ObjectId} = require("mongodb");

router.get('/{sellerUsername}')

router.get('/seller/:id/reviews', async (req, res) => {
    try {
        await Review.aggregate([{
                $match: {seller: ObjectId(req.params.id)}
            },
                {
                    $group: {
                        _id: req.params.id,
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
            ], (err, result) => {
                console.log(result)
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
                        overall_rating: total / reviewCount,
                        store_ratings: result[0],
                        reviewCount,
                    })
                } else if (result.length === 0)
                    return res.send({
                        overall_rating: 0,
                        store_ratings: {
                            r1: 0, r2: 0, r3: 0, r4: 0, r5: 0
                        },
                    })
            }
        );
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.get('/search', async (req, res) => {
    try {
        const sellers = await Seller.find({
            $text: {
                $search: req.query.s,
                $caseSensitive: false,
            }
        }).sort({storeRating: -1});
        return res.send(sellers);
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

module.exports = router;