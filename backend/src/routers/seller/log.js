/**
 * @author yashkasera
 * Created 06/10/21 at 3:14 AM
 */

const express = require('express');
const auth = require("../../middlewares/sellerAuth");
const SellerLog = require("../../models/sellerLog");
const {NotFoundError} = require("../../util/errorHandler");
const router = new express.Router();

router.get('/seller/logs', auth, async(req, res) => {
    try {
        const logs = await SellerLog.find({seller: req.seller._id}).sort({createdAt: -1})
        if (logs)
            return res.send(logs);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

module.exports = router;