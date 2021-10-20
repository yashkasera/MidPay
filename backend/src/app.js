/**
 * @author yashkasera
 * Created 29/09/21 at 06:21 PM
 */
require('dotenv').config()
require('./db/mongoose');
require('./util/razorpay')
const express = require('express');
const firebaseAdmin = require('firebase-admin');
const app = express();
const cors = require('cors');
const sellerRouter = require('./routers/seller/crud');
const sellerChatRouter = require('./routers/seller/chat');
const sellerDashboardRouter = require('./routers/seller/dashboard');
const sellerOrderRouter = require('./routers/seller/order');
const sellerPaymentRouter = require('./routers/seller/payment');
const sellerReviewRouter = require('./routers/seller/review');
const sellerIssuesRouter = require('./routers/seller/issue');
const sellerLogRouter = require('./routers/seller/log');

const customerRouter = require('./routers/customer/crud');
const customerChatRouter = require('./routers/customer/chat');
const customerDashboardRouter = require('./routers/customer/dashboard');
const customerLogRouter = require('./routers/seller/log');
const customerOrderRouter = require('./routers/customer/order');
const customerReviewRouter = require('./routers/customer/review');
const customerIssuesRouter = require('./routers/customer/issue');
const customerPaymentRouter = require('./routers/customer/payment');

const publicSellerRouter = require('./routers/public/seller');
const {NotFoundError} = require("./util/errorHandler");


app.use(express.json());

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
});

app.use(cors());

app.use(publicSellerRouter);

app.use(sellerRouter);
app.use(sellerChatRouter);
app.use(sellerDashboardRouter);
app.use(sellerPaymentRouter);
app.use(sellerOrderRouter);
app.use(sellerReviewRouter);
app.use(sellerLogRouter);
app.use(sellerIssuesRouter);

app.use(customerRouter);
app.use(customerChatRouter);
app.use(customerLogRouter);
app.use(customerOrderRouter);
app.use(customerDashboardRouter);
app.use(customerReviewRouter);
app.use(customerIssuesRouter);
app.use(customerPaymentRouter);

app.all("*", (req, res, next) => {
    throw new NotFoundError();
});

module.exports = app;
