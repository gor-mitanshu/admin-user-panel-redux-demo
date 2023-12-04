const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./config/database');
app.use("/adminImages", express.static(path.join(__dirname, 'adminImages')));
app.use("/userImages", express.static(path.join(__dirname, 'userImages')));

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoute');

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/user/payment', paymentRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
     console.log(`Connection Established with ${PORT}`.bgYellow.black);
});
