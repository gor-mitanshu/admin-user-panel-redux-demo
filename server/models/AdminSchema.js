const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
     firstname: { type: String, required: true, trim: true },
     lastname: { type: String, required: true, trim: true },
     email: { type: String, required: true, unique: true },
     phone: { type: String, required: true, minlength: 10, maxlength: 10 },
     picture: { type: String, required: false },
     password: { type: String, required: true },
     role: { type: String },
     otp: { type: String, },
     otpExpiry: { type: Date }
}, { timestamps: true });

const AdminModel = mongoose.model('admin', Admin);
module.exports = AdminModel;