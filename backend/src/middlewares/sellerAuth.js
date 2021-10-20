const Seller = require('../models/seller')
const firebaseAdmin = require('firebase-admin');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log(req.connection.remoteAddress)
    firebaseAdmin
        .auth()
        .verifyIdToken(token)
        .then(async (decodedToken) => {
            const uid = decodedToken.uid;
    //         firebaseAdmin.auth().setCustomUserClaims("6161a0e776a5fe0de00df67e",{
    //             seller:true
    //         }).then(()=>{
    //             console.log('success')
    //         }).catch((error)=>{
    //             console.log(error)
    //             res.send(error)
    //         })
            const seller = await Seller.findOne({firebaseUid: uid})
            if (!seller)
                throw new Error()
            req.seller = seller
            next()
        })
        .catch((error) => {
            res.status(401).send({error: "Please authenticate"})
        });
}


module.exports = auth