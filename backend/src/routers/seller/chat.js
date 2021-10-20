/**
 * @author yashkasera
 * Created 18/10/21 at 11:55 AM
 */

const express = require('express');
const auth = require("../../middlewares/sellerAuth");
const Chat = require("../../models/chat");
const {NotFoundError, BadRequestError} = require("../../util/errorHandler");
const Message = require("../../models/message");
const {ResourceCreatedSuccess} = require("../../util/successHandler");
const {ObjectId} = require("mongodb");
const router = new express.Router();

router.get('/seller/chats', auth, async (req, res) => {
    try {
        const chats = await Chat.find({seller: req.seller._id}).populate('customer', 'name color phoneNumber');
        if (chats)
            return res.send(chats);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.get('/seller/chats/:id', auth, async (req, res) => {
    try {
        const messages = await Message.find({chat: ObjectId(req.params.id)})
        if(messages)
            return res.send(messages);
        return res.status(404).send(new NotFoundError());
    }catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.post('/seller/chats/new', auth, async (req, res) => {
    try {
        const chat = new Chat({
            seller: req.seller._id,
            customer: req.query.customer
        });
        await chat.save();
        return res.send(new ResourceCreatedSuccess(chat));
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.post('/seller/chats/:id', auth, async (req, res) => {
    try {
        const message = new Message(req.body);
        message.chat = req.params.id;
        message.author = req.seller._id;
        await message.save();
        return res.send(new ResourceCreatedSuccess());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

module.exports = router;