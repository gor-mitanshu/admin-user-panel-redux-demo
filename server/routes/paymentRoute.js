const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../helpers/authMiddleware')

router.post('/payment-checkout', verifyToken, paymentController.paymentCheckout);
router.post('/getRazorPaydetails', verifyToken, paymentController.getRazorPaydetails);

module.exports = router;
