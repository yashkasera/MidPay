/**
 * @author yashkasera
 * Created 06/10/21 at 3:19 AM
 */
const express = require('express');
const auth = require("../../middlewares/sellerAuth");
const router = new express.Router()

router.post('/seller/login',auth,)

module.exports = router