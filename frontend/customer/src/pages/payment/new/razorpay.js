/**
 * @author yashkasera
 * Created 09/10/21 at 2:54 AM
 */
import React from "react";
import API from '../../../util/api';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const displayRazorpay = async () => {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // const result = await API.post("/payment/orders");

    // if (!result) {
    //     alert("Server error. Are you online?");
    //     return;
    // }

    // const { amount, id: order_id, currency } = {result.data};

    const options = {
        key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
        amount: 100000,
        currency: "INR",
        name: "Soumya Corp.",
        description: "Test Transaction",
        order_id: "order_id",
        handler: async function (response) {
            const data = {
                orderCreationId: "order_id",
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await API.post("/payment/success", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

export default displayRazorpay