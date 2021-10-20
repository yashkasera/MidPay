var nodemailer = require('nodemailer');
const sendOTPEmail = async (email, otp) => {
    transporter.sendMail({
        from: process.env.MIDPAY_EMAIL,
        to: email,
        subject: "One Time Password for logging in to MidPay",
        html: `<strong>${otp}</strong> is the One Time Password to log in to MidPay. Please make sure to keep this safe<br><br>
        <i>In case you didnt request an OTP, someone else might be trying to login to your account. Please change your password immediately to secure it.</i>
        <br>This otp is valid only for 10 minutes. After that you'll have to request a new one!`

    }, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    })
}

module.exports = {
    sendOTPEmail,
}
