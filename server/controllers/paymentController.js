require('dotenv').config();
const nodemailer = require('nodemailer');
const Payment = require('../models/UserPaymentSchema');
const Razorpay = require('razorpay');

const instance = new Razorpay({
     key_id: process.env.KEY_ID,
     key_secret: process.env.KEY_SECRET,
})

const paymentController = {
     paymentCheckout: async (req, res) => {
          try {
               const options = {
                    amount: Number(req.body.amount * 100),
                    // amount: Number(req.body.amount),
                    currency: "INR",
               };
               const order = await instance.orders.create(options)
               res.status(200).send({ success: true, message: "Successfully Ordered", order })
          } catch (error) {
               console.log(error)
               res.status(400).send({ success: false, message: error.message })
          }
     },

     getRazorPaydetails: async (req, res) => {
          try {
               const { razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    uid,
                    firstname,
                    lastname,
                    email,
                    amount,
                    order_id,
                    currency,
                    order_created_at,
                    amount_due,
                    amount_paid,
                    attempts } = req.body;

               const orderCreatedAtISO = new Date(order_created_at * 1000).toISOString();

               const paymnet = new Payment({
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    uid,
                    firstname,
                    lastname,
                    email,
                    amount,
                    order_id,
                    currency,
                    order_created_at: orderCreatedAtISO,
                    amount_due,
                    amount_paid,
                    attempts
               });
               await paymnet.save();

               var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    service: 'gmail',
                    auth: {
                         user: process.env.EMAIL_URL,
                         pass: process.env.EMAIL_PASSWORD,
                    }
               });

               const mailOptions = {
                    from: process.env.EMAIL_URL,
                    to: email,
                    subject: 'Payment Successful.',
                    html: `
               <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Success</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #e0e0e0; 
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: #4caf50;
        text-align: center;
      }

      p {
        margin-bottom: 10px;
        line-height: 1.6;
      }

      strong {
        font-weight: bold;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        margin-bottom: 5px;
      }

      .footer {
        margin-top: 20px;
        text-align: center;
        color: #777;
      }

      a {
        color: #777 !important;
        text-decoration: none;
        font-weight: bold;
      }

      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h2>Payment Successful</h2>

      <p>Dear <strong>${firstname} ${lastname},</strong></p>

      <p>
        Thank you for your payment. Your payment of
        <strong style="color: red"> ₹ ${amount / 100}</strong> has been
        successfully processed.
      </p>

      <p>Here are the details of your payment:</p>

      <ul>
        <li><strong>Order ID:</strong> ${order_id}</li>
        <li><strong>Amount Paid:</strong> ₹ ${amount / 100} INR</li>
      </ul>

      <p>Thank you for choosing our services!</p>

      <p class="footer">
        Best regards,<br />
        <a href="https://brainsquaretech.com/" target="_blank"
          >BrainSquare Technologies PVT.LTD</a
        >
      </p>
    </div>
  </body>
</html>
               `,
               };
               transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                         console.error('Error sending email:', error);
                    } else {
                         // console.log('Email sent:', info.response);
                         return res.status(200).send({
                              success: true,
                              message: 'Email sent successfully',
                              technicalMessage: 'Email sent: ' + info.response
                         });
                    }
               });
               return res.status(200).send({
                    message: 'Payment Successful',
                    data: paymnet,
                    success: true
               });
          } catch (error) {
               // console.error('Error processing payment :', error.message);
               var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    service: 'gmail',
                    auth: {
                         user: process.env.EMAIL_URL,
                         pass: process.env.EMAIL_PASSWORD,
                    }
               });
               const mailOptions = {
                    from: process.env.EMAIL_URL,
                    to: email,
                    subject: 'Payment Failure.',
                    html: `
             <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Failed</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #e0e0e0; /* Change the background color here */
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: #ff0000;
        text-align: center;
      }

      p {
        margin-bottom: 10px;
        line-height: 1.6;
      }

      strong {
        font-weight: bold;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        margin-bottom: 5px;
      }

      .footer {
        margin-top: 20px;
        text-align: center;
        color: #777;
      }

      a {
        color: #777 !important;
        text-decoration: none;
        font-weight: bold;
      }

      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h2>Payment Failed</h2>

      <p>Dear <strong>${firstname} ${lastname},</strong></p>

      <p>
        We're sorry, but your payment of
        <strong style="color: red">₹ ${amount / 100}</strong> could not be
        processed successfully.
      </p>

      <p>Please check the details of your payment:</p>

      <ul>
        <li><strong>Order ID:</strong> ${order_id}</li>
        <li><strong>Amount Attempted:</strong>₹ ${amount / 100} INR</li>
      </ul>

      <p>Contact your payment provider or try again later.</p>

      <p class="footer">
        If you have any questions, please contact us at <br />
        <!-- <a href="mailto:hr@brainsquaretech.com">support@brainsquaretech.com</a>
        from <br /> -->
        <a href="https://brainsquaretech.com/" target="_blank"
          >support@brainsquaretech.com</a
        >
      </p>
    </div>
  </body>
</html>
               `,
               };
               transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                         console.error('Error sending email:', error);
                         return res.status(500).send({
                              error: 'Internal server error for sending email',
                              message: 'Failed to send email',
                              emailError: error.message,
                              success: false
                         });
                    } else {
                         // console.log('Email sent:', info.response);
                         return res.status(200).send({
                              success: false,
                              error: 'Internal server error',
                              message: 'Error processing payment',
                              technicalMessage: 'Email sent: ' + info.response
                         });
                    }
               });
          }
     },
}

module.exports = paymentController;