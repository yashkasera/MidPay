const Customer = require('../models/customer')
const firebaseAdmin = require('firebase-admin');
const {AuthenticationError} = require("../util/errorHandler");

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    firebaseAdmin
        .auth()
        .verifyIdToken(token)
        .then(async (decodedToken) => {
            const uid = decodedToken.uid;
            const customer = await Customer.findOne({firebaseUid: uid})
            if (!customer)
                throw new Error()
            req.customer = customer
            next()
        })
        .catch((error) => {
            res.status(401).send(new AuthenticationError())
        });
}

module.exports = auth