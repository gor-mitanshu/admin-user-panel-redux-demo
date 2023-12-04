const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');
const verifyToken = require('../helpers/authMiddleware');

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'userImages/');
     },
     filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileExtension = path.extname(file.originalname);
          const fileName = uniqueSuffix + fileExtension;
          cb(null, fileName);
     }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single('picture'), userController.signup);
router.post('/verify/:verificationToken', userController.verifyUserOTP);
router.post('/signin', userController.signin);
router.get('/loggedProfile', verifyToken, userController.getProfileByToken);
router.get('/getUser/:id', verifyToken, userController.getUser);
router.get('/getUsers', verifyToken, userController.getUsers);
router.put('/update/:id', verifyToken, upload.single('picture'), userController.update);
router.delete('/delete/:id', verifyToken, userController.deleteUser);
router.put('/changePassword/:id', verifyToken, userController.changePassword);
router.get('/getUserCounts', verifyToken, userController.getUserCount);
router.post('/forgetPassword', userController.forgetPassword);
router.post('/verifyOtp', userController.verifyOTP);
router.put('/resetPassword/:id/:token', userController.resetPassword);

module.exports = router;
