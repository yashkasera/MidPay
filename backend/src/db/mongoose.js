/**
 * @author yashkasera
 * Created 29/09/21 at 06:34 PM
 */
const mongoose = require('mongoose');
const customer = require('../models/customer');
const seller = require('../models/seller');
const order = require('../models/order');
const review = require('../models/review');
const issue = require('../models/issue');
const log = require('../models/sellerLog');
const payment = require('../models/payment')
const chat = require('../models/chat');
const message = require('../models/message');

const uri = process.env.DB_URI;
mongoose.connect(uri, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(async () => {
    await customer.init()
    await seller.init()
    await order.init()
    await review.init()
    await issue.init()
    await log.init()
    await payment.init()
    await chat.init()
    await message.init()
})