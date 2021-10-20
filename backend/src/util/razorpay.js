/**
 * @author yashkasera
 * Created 04/10/21 at 12:29 PM
 */

const Razorpay = require('razorpay');
const crypto = require("crypto");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (order) => {
    try {
        const razorpay_order = await instance.orders.create({
            amount: order.amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: order.orderId,
            notes: {
                orderId: order._id.toString(),
                customerId: order.customer && order.customer.toString(),
                sellerId: order.seller.toString(),
                description: order.description.toString()
            }
        });
        order.razorpay_order_id = razorpay_order.id
    } catch (e) {
        console.log(e);
    }
};

const fetchPaymentByPaymentId = async (payment_id) => {
    try {
        return await instance.payments.fetch(payment_id)
    } catch (e) {
        return e
    }

}

const fetchOrderByOrderId = async (orderId) => {
    try {
        return await instance.orders.fetch(orderId)
    } catch (e) {
        return e
    }
}

const fetchPaymentByOrderId = async (orderId) => {
    try {
        return await instance.orders.fetchPayments(orderId)
    } catch (e) {
        return e
    }
}

const verifySignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString()).digest('hex');
    return expectedSignature === razorpay_signature
}

module.exports = {
    createOrder,
    fetchPaymentByPaymentId,
    fetchPaymentByOrderId,
    fetchOrderByOrderId,
    verifySignature,

}
