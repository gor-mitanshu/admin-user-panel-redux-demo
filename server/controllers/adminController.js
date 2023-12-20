require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Admin = require('../models/AdminSchema');

const jwtSecret = process.env.JWT_SECRET;
function generateOTP () {
     let digits = '0123456789';
     let OTP = '';
     for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
     }
     return OTP;
}

const adminController = {
     signup: async (req, res) => {
          try {
               const { firstname, lastname, email, phone, password } = req.body;
               if (!firstname) {
                    return res.status(500).send({ message: "Please Enter the Firstname", success: false });
               }
               if (!lastname) {
                    return res.status(500).send({ message: "Please Enter the Lastname", success: false });
               }
               if (!email) {
                    return res.status(500).send({ message: "Please Enter the Email", success: false });
               }
               if (!phone) {
                    return res.status(500).send({ message: "Please Enter the Phone", success: false });
               }
               if (!password) {
                    return res.status(500).send({ message: "Please Enter the Password", success: false });
               }
               if (!firstname || !lastname || !email || !phone) {
                    return res.status(500).send({ message: "Please Enter all the fields", success: false });
               }
               const preregistedAdmin = await Admin.findOne({ email: email });
               if (!!preregistedAdmin) {
                    return res.status(409).send({
                         message: 'Admin Already Exists',
                         success: false,
                         data: null,
                    });
               }
               const hashedPassword = await bcrypt.hash(password, 10);
               let picture = '';
               if (req.file) {
                    picture = `${req?.file?.filename}`;
               }

               const newAdmin = new Admin({
                    firstname,
                    lastname,
                    email,
                    phone,
                    password: hashedPassword,
                    role: "admin",
                    picture: picture,
               });
               await newAdmin.save();
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
                    subject: 'Registration Successful',
                    text: 'Thank you for Registering!',
               };
               transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                         console.error('Error sending email:', error);
                    } else {
                         return res.status(200).send({
                              success: true,
                              message: 'Email sent successfully',
                              technicalMessage: 'Email sent: ' + info.response
                         });
                    }
               });
               return res.status(200).send({
                    message: 'Admin Registered Successfully!!!',
                    data: newAdmin,
                    success: true
               });
          } catch (error) {
               console.error('Error registering user:', error.message);
               return res.status(400).send({
                    error: 'Internal server error',
                    error: error.message
               });
          }
     },

     signin: async (req, res) => {
          try {
               const { email, password } = req.body;
               const admin = await Admin.findOne({ email: email });

               if (!email) {
                    return res.status(400).send({ message: "Please Enter the Email", success: false });
               }
               if (!password) {
                    return res.status(400).send({ message: "Please Enter the Password", success: false });
               }

               if (!admin) {
                    return res.status(404).send({ message: "Admin not found", success: false });
               }

               const compareHashedPassword = await bcrypt.compare(req.body.password, admin.password);

               if (!compareHashedPassword) {
                    return res.status(401).send({ message: "Password does not match", success: false });
               }

               const expireIn = "10h";
               const token = jwt.sign({ admin }, jwtSecret, { expiresIn: expireIn });

               return res.status(200).send({
                    message: "Logged In Successfully!!!",
                    success: true,
                    data: token
               });
          } catch (error) {
               return res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message,
                    success: false
               });
          }
     },

     getProfileByToken: async (req, res) => {
          try {
               const token = req.headers.authorization;
               if (!token) {
                    return res.status(500).send({
                         message: "Token not found",
                         success: false
                    });
               }
               const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
               const admin = await Admin.findOne({ _id: data.admin._id });
               if (!admin) {
                    return res.status(404).send({
                         message: "Admin not found",
                         success: false
                    });
               }
               return res.status(200).send({
                    message: "Successfully Got the User",
                    success: true,
                    data: admin
               });
          } catch (error) {
               res.status(400).send({
                    message: "Internal server error",
                    error: error.message,
                    success: false
               });
          }
     },

     getAdmin: async (req, res) => {
          try {
               const { id } = req.params;
               if (!id) {
                    return res.status(500).send({
                         success: false,
                         message: "Id not found",
                    });
               }
               const viewAdmin = await Admin.findById({ _id: id });
               if (!viewAdmin) {
                    return res.status(500).send({
                         success: false,
                         message: "Admin not found",
                    });
               }
               return res.status(200).send({
                    success: true,
                    message: "Success",
                    data: viewAdmin
               });
          } catch (error) {
               res.status(400).send({
                    message: "Internal server error",
                    error: error.message,
                    success: false
               });
          }
     },

     sendEmail: async (req, res) => {
          try {
               const { to, subject, body, from } = req.body;
               const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    service: 'gmail',
                    auth: {
                         user: process.env.EMAIL_URL,
                         pass: process.env.EMAIL_PASSWORD,
                    }
               });
               // Email data
               const mailOptions = {
                    from: from,
                    to: to,
                    subject: subject,
                    text: body,
               };
               // Send the email
               transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                         console.error(error.message);
                         return res.status(500).send({
                              success: false,
                              message: 'Error sending email',
                              error: error.message,
                         });
                    } else {
                         // console.log('Email sent: ' + info.response);
                         return res.status(200).send({
                              success: true,
                              message: 'Email sent successfully',
                              technicalMessage: 'Email sent: ' + info.response
                         });
                    }
               });
          } catch (error) {
               console.error('Error composing and sending email:', error.message);
               return res.status(500).send({
                    success: false,
                    message: 'Internal server error',
                    error: error.message,
               });
          }
     },

     update: async (req, res) => {
          const { id } = req.params;
          if (!id) {
               return res.status(500).send({
                    success: false,
                    message: "Id not found",
               });
          }
          const { firstname, lastname, email, phone } = req.body;
          if (!firstname) {
               return res.status(500).send({ message: "Please Enter the Firstname", success: false });
          }
          if (!lastname) {
               return res.status(500).send({ message: "Please Enter the Lastname", success: false });
          }
          if (!email) {
               return res.status(500).send({ message: "Please Enter the Email", success: false });
          }
          if (!phone) {
               return res.status(500).send({ message: "Please Enter the Phone", success: false });
          }
          if (!firstname || !lastname || !email || !phone) {
               return res.status(500).send({ message: "Please Enter all the fields", success: false });
          }
          try {
               const existingAdmin = await Admin.findById(id);
               let picture = existingAdmin.picture || '';
               if (req?.file) {
                    picture = `${req.file.filename} `;
                    if (existingAdmin.picture) {
                         const imagePath = path.join(__dirname, 'adminImages', existingAdmin.picture);
                         if (fs.existsSync(imagePath)) {
                              fs.unlinkSync(imagePath);
                         }
                    }
               }
               const updateAdminFields = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    picture: picture,
               };
               const updateAdmin = await Admin.findOneAndUpdate(
                    { _id: id },
                    {
                         $set: updateAdminFields,
                    },
                    { new: true }
               );

               if (!updateAdmin) {
                    return res.status(500).send({
                         message: "Update Unsuccessful. Please try again later",
                         error: error.message,
                         success: true
                    })
               }
               return res.status(200).send({
                    message: "Updated Successfully!!!",
                    data: updateAdmin,
                    success: true
               });
          } catch (error) {
               console.log(error)
               return res.status(400).send({
                    success: false,
                    message: "Internal Server Error",
                    error: error.messsage
               });
          }
     },

     changePassword: async (req, res) => {
          const { id } = req.params;
          if (!id) {
               return res.status(500).send({
                    success: false,
                    message: "Id not found",
               });
          }
          try {
               const hashedPassword = await bcrypt.hash(req.body.password, 10);
               const result = await Admin.findOneAndUpdate(
                    { _id: id },
                    { $set: { password: hashedPassword, } },
                    { new: true }
               )
               if (!!result) {
                    return res.status(200).send({
                         success: true,
                         message: "Update Password Successfully",
                         data: result
                    });
               } else {
                    return res.status(404).send({
                         success: false,
                         message: "Error Changing Password",
                    })
               }
          } catch (error) {
               res.status(404).send({
                    success: false,
                    message: "Internal Server Error",
                    error
               })
          }
     },

     forgetPassword: async (req, res) => {
          try {
               const email = req.body.email;
               const admin = await Admin.findOne({ email: email });

               if (!admin) {
                    return res.status(404).send({ message: 'Email not found!!!' });
               }

               // const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });
               const otp = generateOTP();
               const otpExpiry = new Date();
               otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);

               admin.otp = otp;
               admin.otpExpiry = otpExpiry;
               await admin.save();

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

               var mailOptions = {
                    from: process.env.EMAIL_URL,
                    to: email,
                    subject: 'Forgot Password OTP',
                    text: `Your OTP is: ${otp}`,
               };

               transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                         console.log(error.message);
                         res.status(500).json({ message: 'Failed to send OTP' });

                    } else {
                         // console.log('Email sent: ' + info.response);
                         return res.status(200).send({
                              message: 'OTP sent successfully',
                              data: 'Email sent: ' + info.response,
                              status: "Success",
                              success: true
                         });
                    }
               });
          } catch (error) {
               return res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    error: error.messsage
               });
          }
     },

     verifyOTP: async (req, res) => {
          const { email, otp } = req.body;

          const admin = await Admin.findOne({ email });

          if (!admin) {
               return res.status(404).send({ message: 'User not found' });
          }

          if (admin.otp !== otp || admin.otpExpiry < new Date()) {
               return res.status(400).send({ message: 'Invalid or expired OTP' });
          }

          admin.otp = undefined;
          admin.otpExpiry = undefined;
          await admin.save();

          const expireIn = "1d";
          const token = jwt.sign({ admin },
               'token',
               { expiresIn: expireIn });

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

          var mailOptions = {
               from: process.env.EMAIL_URL,
               to: email,
               subject: 'OTP Verified Successfully.',
          };

          transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
                    console.log(error.message);
                    res.status(500).json({ message: 'OTP Not Verified' });

               } else {
                    return res.status(200).send({
                         message: 'OTP Verified Successfully',
                         data: { token, id: admin._id },
                         status: "Success",
                         success: true,
                    });
               }
          });
     },

     resetPassword: async (req, res) => {
          const { id, token } = req.params;
          const { password } = req.body;
          try {
               const tokens = jwt.verify(token, 'token');
               if (tokens) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const updatePassword = await Admin.findByIdAndUpdate({ _id: id },
                         { $set: { password: hashedPassword } },
                         { new: true })
                    if (updatePassword) {
                         return res.status(200).send({ message: "Password Reset Successfully", success: true, data: updatePassword })
                    } else {
                         return res.status(404).send({
                              message: "Password not updated",
                              success: false
                         })
                    }
               }
          } catch (error) {
               return res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    error: error.messsage
               });
          }
     },
};

module.exports = adminController;