/**
 * @author yashkasera
 * Created 03/10/21 at 11:42 PM
 */
const express = require('express')
const router = new express.Router();
const Customer = require("../../models/customer");
const {UserCreatedSuccess} = require("../../util/successHandler");
const {BadRequestError, SchemaValidationError} = require("../../util/errorHandler");
const auth = require("../../middlewares/customerAuth");

router.post('/customer/new', async (req, res) => {
    console.log(req.body)
    const customer = new Customer(req.body)
    customer.verified = false
    try {
        await customer.save()
        res.send(new UserCreatedSuccess())
    } catch (e) {
        res.status(400).send(new BadRequestError(e.message))
    }
})

router.get('/customer/profile', auth, async (req, res) => {
    return res.send(req.customer)
})

router.patch('/customer/profile', auth, async (req, res) => {
    const allowedUpdates = ["name", "age", "gender", "instagramUsername", 'email', 'phoneNumber'];
    const isValidOperation =
        Object.keys(req.body)
            .every((update) =>
                allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    Object.keys(req.body).forEach(update => {
        req.customer[update] = req.body[update]
    });
    try {
        return res.send(await req.customer.save())
    } catch (e) {
        return res.status(400).send(SchemaValidationError(e.message))
    }
})

module.exports = router;