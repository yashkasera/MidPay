/**
 * @author yashkasera
 * Created 03/10/21 at 06:52 PM
 */
const express = require("express");
const router = new express.Router();
const Issue = require('../../models/issue');
const auth = require('../../middlewares/sellerAuth');
const {NotFoundError} = require("../../util/errorHandler");
const {ResourceUpdatedSuccess} = require("../../util/successHandler");
const {ObjectId} = require("mongodb");

router.get('/seller/issue', auth, async (req, res) => {
    try {
        const issues = await Issue.find({seller: req.seller._id})
        if (issues)
            return res.send(issues);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.get('/seller/issue/:id', auth, async (req, res) => {
    try {
        const issue = await Issue.findOne({issueId: req.params.id},)
            .populate('customer', 'name');
        if (issue) {
            if(issue.status === "RAISED") {
                issue.status = "VIEWED";
                await issue.save()
            }
            return res.send(issue);
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.get('/seller/issues/new', auth, async (req, res) => {
    const issues = await Issue.find({
        seller: ObjectId(req.seller._id),
        status: 'RAISED'
    }).populate('customer', 'name');
    return res.send(issues);
})

module.exports = router;