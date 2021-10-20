/**
 * @author yashkasera
 * Created 17/10/21 at 9:26 PM
 */

const mongoose = require('mongoose');
const Chat = require("./chat");
const {ObjectId} = require("mongodb");

const schema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    author: String,
    message: String,
    attachment: String,
}, {
    timestamps: true
})

schema.post('save', async (doc, next) => {
    try{
        await Chat.findByIdAndUpdate(ObjectId(doc.chat), {updatedAt: new Date()})
        next();
    }catch(e){
        console.log(e.message)
    }
})

const Message = mongoose.model('Message', schema);

module.exports = Message
