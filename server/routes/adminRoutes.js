const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminController = require('../controllers/adminController');
const verifyToken = require('../helpers/authMiddleware')

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'adminImages/');
     },
     filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileExtension = path.extname(file.originalname);
          const fileName = uniqueSuffix + fileExtension;
          cb(null, fileName);
     }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single('picture'), adminController.signup);
router.post('/signin', adminController.signin);
router.get('/loggedProfile', verifyToken, adminController.getProfileByToken);
router.get('/getAdmin/:id', verifyToken, adminController.getAdmin);
router.post('/sendMail', verifyToken, adminController.sendEmail);
router.put('/update/:id', verifyToken, upload.single('picture'), adminController.update);
router.put('/changePassword/:id', verifyToken, adminController.changePassword);
router.post('/forgetPassword', adminController.forgetPassword);
router.post('/verifyOtp', adminController.verifyOTP);
router.put('/resetPassword/:id/:token', adminController.resetPassword);

module.exports = router;
