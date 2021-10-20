/**
 * @author yashkasera
 * Created 06/10/21 at 3:14 AM
 */

const express = require('express');
const auth = require("../../middlewares/customerAuth");
const Log = require("../../models/customerLog");
const {NotFoundError} = require("../../util/errorHandler");
const router = new express.Router();

router.get('/customer/log', auth, async(req, res) => {
    try {
        const logs = await Log.find({userId: req.customer._id})
        if (logs)
            return res.send(logs);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

module.exports = router;