/**
 * @author yashkasera
 * Created 03/10/21 at 06:24 PM
 */
const express = require('express')
const router = new express.Router()
const Seller = require('../../models/seller')
const auth = require('../../middlewares/sellerAuth')
const {UserCreatedSuccess} = require('../../util/successHandler')
const {BadRequestError, SchemaValidationError} = require("../../util/errorHandler");
const {enableDeviceHelpers} = require("express-device");
const firebaseAdmin = require('firebase-admin');


router.post('/seller/new', async (req, res) => {
    const seller = new Seller(req.body)
    seller.verified = false
    seller.balance = 0.0
    try {
        await seller.save()
        return res.send(new UserCreatedSuccess())
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message))
    }
})

router.get('/seller/profile', auth, async (req, res) => {
    return res.send(req.seller)
})

router.patch('/seller/profile', auth, async (req, res) => {
    const allowedUpdates = ["address", "name", "storeName", "storeDescription", "instagramUsername", "enabled"];
    const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    Object.keys(req.body).forEach(update => {
        req.seller[update] = req.body[update]
    });
    try {
        return res.send(await req.seller.save())
    } catch (e) {
        return res.status(400).send(new SchemaValidationError(e.message))
    }
})

module.exports = router