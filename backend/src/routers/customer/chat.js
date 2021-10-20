/**
 * @author yashkasera
 * Created 18/10/21 at 12:44 PM
 */

const express = require('express');
const auth = require("../../middlewares/customerAuth");
const Chat = require("../../models/chat");
const {NotFoundError, BadRequestError} = require("../../util/errorHandler");
const Message = require("../../models/message");
const {ResourceCreatedSuccess} = require("../../util/successHandler");
const {ObjectId} = require("mongodb");
const router = new express.Router();

router.get('/customer/chats', auth, async (req, res) => {
    try {
        const chats = await Chat.find({customer: req.customer._id});
        if (chats)
            return res.send(chats);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.get('/customer/chats/:id', auth, async (req, res) => {
    try {
        const messages = await Message.find({chat: ObjectId(req.params.id)})
        if(messages)
            return res.send(messages);
        return res.status(404).send(new NotFoundError());
    }catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.post('/customer/chats/new', auth, async (req, res) => {
    try {
        const chat = new Chat({
            seller: req.customer._id,
            customer: req.query.customer
        }).populate('seller','storeName username');
        await chat.save();
        return res.send(new ResourceCreatedSuccess(chat));
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.post('/customer/chats/:id', auth, async (req, res) => {
    try {
        const message = new Message(req.body);
        message.chat = req.params.id;
        message.author = req.customer._id;
        await message.save();
        return res.send(new ResourceCreatedSuccess());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

module.exports = router;