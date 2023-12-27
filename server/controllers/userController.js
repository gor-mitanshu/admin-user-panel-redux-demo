require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const User = require('../models/UserSchema');

const jwtSecret = process.env.JWT_SECRET;
function generateOTP () {
  let digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const userController = {
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
      if (!firstname | !lastname | !email | !phone | !password) {
        return res.status(500).send({ message: "Please Enter all the fields", success: false });
      }
      const preregistedUser = await User.findOne({ email: email });
      if (!!preregistedUser) {
        return res.status(409).send({
          message: 'User Already Exists',
          success: false,
          data: null,
        });
      }
      const expireIn = "1h";
      const verificationToken = jwt.sign({ email }, jwtSecret, { expiresIn: expireIn });
      const hashedPassword = await bcrypt.hash(password, 10);

      let picture = '';
      if (req.file) {
        picture = `${req?.file?.filename}`;
      }
      const newAdmin = new User({
        firstname,
        lastname,
        email,
        phone,
        password: hashedPassword,
        role: "user",
        picture: picture,
        status: "active",
        isVerified: false,
        verificationToken: verificationToken,
      });
      await newAdmin.save();

      const verificationLink = `${process.env.REACT_URL_USER}/verify/${verificationToken}`

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
        subject: 'Registration Successful.',
        html: `
          <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      type="text/css"
    />
    <script
      src="https://kit.fontawesome.com/363da174db.js"
      crossorigin="anonymous"
    ></script>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
      }
      .brainsquare-a {
        font-size: 40px !important;
      }
      .container a {
        text-decoration: none;
        font-size: 25px;
      }
      .brainsquare {
        color: rgb(197, 68, 68);
        margin: 5px 0;
        text-align: center;
        cursor: pointer;
      }
      .icon {
        color: rgba(255, 0, 0, 0.7);
        border-radius: 50%;
        padding: 10px;
        background-color: white;
        width: 10%;
      }
      .logo {
        display: flex;
        justify-content: center;
        background-color: rgba(255, 0, 0, 0.6);
        margin: 10px 10px 10px 10px;
        border-radius: 4px;
        color: red !important;
      }

      .success {
        color: rgba(0, 128, 0.7);
      }
      .content {
        padding: 20px;
        border-radius: 5px;
      }

      .text-center {
        text-align: center;
      }
      .center {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .margin-btn {
        margin: 40px 0 !important;
      }

      .btn {
        text-decoration: none !important;
        color: #fff !important;
        background-color: rgba(255, 0, 0, 0.6);
        display: inline-block !important;
        padding: 8px 20px !important;
        border-radius: 5px !important;
      }
      .error {
        color: red;
      }
      .margin-bottom {
        margin-bottom: 40px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <a
        href="https://brainsquaretech.com/"
        target="_blank"
        class="brainsquare-a"
      >
        <div class="brainsquare">BrainSquare</div>
      </a>
      <div class="logo" style="text-align: center">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center">
              <img
                style="display: block"
                src="https://images.emlcdn.net/cdn/14/QHcab14c9/email.png"
                alt="Facebook"
                height="48"
                width="48"
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="content">
        <h1 class="text-center">Email Verification</h1>
        <p>
          <b class="success"> Hii ${newAdmin.firstname + " " + newAdmin.lastname} , </b>
        </p>
        <p>
          Thank you for signing up! You are almost set to start enjoying the
          panel app. Please click the link below to verify your email address,
          and get started. The link expires in about 1 Hour.
        </p>
        <div class="margin-btn" style="text-align: center">
          <a href="${verificationLink}" class="btn" target="_blank" class="btn"
            >Verify Email</a
          >
        </div>
        <div class="error margin-bottom">
          <hr />
        </div>
        <div class="social-icons" style="text-align: center">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="display: inline-table"
          >
            <tr>
              <td style="width: 10px"></td>
              <td>
                <a
                  href="https://www.facebook.com/brainsquaretech/"
                  target="_blank"
                >
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/facebook4.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
              <td>
                <a href="#" target="_blank">
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/insta.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
              <td>
                <a
                  href="https://in.linkedin.com/company/brainsquare"
                  target="_blank"
                >
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/linkedin.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
              <td>
                <a href="#" target="_blank">
                  <img
                    style="display: block"
                    src="https://images.emlcdn.net/cdn/14/QHcab14c9/twitter.png"
                    alt="Facebook"
                    height="32"
                    width="32"
                  />
                </a>
              </td>
              <td style="width: 10px"></td>
            </tr>
          </table>
        </div>
        <div style="text-align: center; margin-top: 15px; font-size: 12px">
          1206, Shivalik Shilp, Iskcon Cross Road,
        </div>
        <div style="text-align: center; margin-top: 5px; font-size: 12px">
          Sarkhej - Gandhinagar Hwy, Ahmedabad, Gujarat 380015
        </div>
        <div
          style="
            text-align: center;
            margin-top: 25px;
            margin-bottom: 50px !important;
            font-size: 15px;
            color: grey;
          "
        >
          | Privacy Policy | Contact Details |
        </div>
        <div
          style="
            font-size: 9px;
            text-decoration: underline;
            cursor: pointer;
            color: grey;
          "
        >
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left">Unsubscribe?</td>
              <td align="right">by © Mitanshu Gor</td>
            </tr>
          </table>
        </div>
      </div>
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
        message: 'Registered Successfully!!!',
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

  verifyUserOTP: async (req, res) => {
    const verificationToken = req.params.verificationToken;

    try {
      const user = await User.findOne({ verificationToken: verificationToken });

      if (!user) {
        return res.status(404).send({ message: 'Invalid verification token', success: false });
      }

      if (user.isVerified) {
        return res.status(200).send({ message: 'Email already verified', success: true });
      }

      try {
        jwt.verify(verificationToken, process.env.JWT_SECRET);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).send({
            message: 'Token has expired',
            success: false,
          });
        } else {
          return res.status(500).send({
            message: 'Error verifying the token',
            success: false,
          });
        }
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();

      return res.status(200).send({ message: 'Email verification successful', success: true });
    } catch (error) {
      return res.status(500).send({ message: 'Internal server error', success: false });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!email) {
        return res.status(400).send({ message: "Please Enter the Email", success: false });
      }
      if (!password) {
        return res.status(400).send({ message: "Please Enter the Password", success: false });
      }
      if (!user) {
        return res.status(404).send({
          message: 'User not found',
          success: false,
        });
      }
      if (!user.isVerified) {
        return res.status(401).send({
          message: "Email not verified. Please verify your email to log in.",
          success: false,
        });
      }

      const compareHashedPassword = await bcrypt.compare(password, user.password);
      if (!compareHashedPassword) {
        return res.status(401).send({
          message: "Passwords do not match",
          success: false
        });
      }
      const expireIn = "10h";
      const token = jwt.sign({ user },
        jwtSecret,
        { expiresIn: expireIn });

      return res.status(200).send({
        message: "Logged In Successfully!!!",
        success: true,
        data: token,
        isVerified: user.isVerified
      })
    } catch (error) {
      return res.status(400).send({
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
      const user = await User.findOne({ _id: data.user._id });
      if (!user) {
        return res.status(404).send({
          message: "Admin not found",
          success: false
        });
      }
      return res.status(200).send({
        message: "Successfully Got the User",
        success: true,
        data: user
      });
    } catch (error) {
      res.status(400).send({
        message: "Internal server error",
        error: error.message,
        success: false
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(500).send({
          success: false,
          message: "Id not found",
        });
      }
      const viewUser = await User.findById({ _id: id })
      if (!viewUser) {
        res.status(500).send({
          success: false,
          message: "Data Not Found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Success",
        data: viewUser
      });
    } catch (error) {
      res.status(404).send({
        success: false,
        message: "Internal server error",
        error: error.messsage
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const getAllUser = await User.find({ role: "user" });
      if (!getAllUser) {
        return res.status(500).send({
          success: false,
          message: "Data Not Found",
          error: error.message
        });
      }
      return res.status(200).send({
        success: true,
        message: "Success",
        data: getAllUser
      });
    } catch (error) {
      res.status(404).send({
        success: false,
        message: "Some Error Occured",
        error: error.message
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
    const { firstname, lastname, email, phone, status } = req.body;
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
      const existingUser = await User.findById(id);
      let picture = existingUser.picture || '';
      if (req.file) {
        picture = `${req.file.filename} `;
        if (existingUser.picture) {
          const imagePath = path.join(__dirname, 'userImages', existingUser.picture);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }

      const updateUserFields = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        status: status,
        picture: picture,
      };

      const updateUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: updateUserFields,
        },
        { new: true }
      );
      if (!updateUser) {
        return res.status(500).send({
          message: "Update Unsuccessful",
          error: error.message,
          success: true
        })
      }
      return res.status(200).send({
        message: "Updted Successfully!!!",
        data: updateUser,
        success: true
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Internal Server Error",
        error: error.messsage
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(500).send({
          success: false,
          message: "Id not found",
        });
      }
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      const deleteUser = await User.findByIdAndDelete({ _id: id })
      if (!deleteUser) {
        return res.status(404).send({
          success: false,
          message: "Unable to Delete User",
        })
      }
      if (user.picture) {
        const filePath = path.join(__dirname, 'masterImages', user.picture.split('/')[1]);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      }
      return res.status(200).send({
        success: true,
        message: "User Deleted Successfully",
      })
    } catch (error) {
      res.status(404).send({
        success: false,
        message: "Internal Server Error",
        error: error.message
      })
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
      const result = await User.findOneAndUpdate(
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
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).send({ message: 'Admin not found' });
      }

      // const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });
      const otp = generateOTP();
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();

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
        text: `Your OTP is: ${otp} `,
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

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).send({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const expireIn = "1d";
    const token = jwt.sign({ user },
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
          data: { token, id: user._id },
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
        const updatePassword = await User.findByIdAndUpdate({ _id: id },
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

  getUserCount: async (req, res) => {
    try {
      const activeUsersCount = await User.countDocuments({ role: 'user', status: 'active' });
      const inactiveUsersCount = await User.countDocuments({ role: 'user', status: 'inactive' });
      const totalUsersCount = await User.countDocuments({ role: 'user' });

      return res.status(200).send({
        success: true,
        message: 'Success',
        data: {
          active: activeUsersCount,
          inactive: inactiveUsersCount,
          total: totalUsersCount,
        },
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Some Error Occurred',
        error: error.message,
      });
    }
  },
};

module.exports = userController;