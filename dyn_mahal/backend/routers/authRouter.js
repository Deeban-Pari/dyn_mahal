const express=require('express');
const authController=require('../controllers/authController');
const { identifier } = require('../middlewares/identification');

const router=express.Router();

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/signout',identifier,authController.signout);

router.post('/send-verification-code',authController.sendVerificationCode);
router.post('/verify-verification-code',authController.verifyVerificationCode);
router.post('/change-password',authController.changePassword);
router.post('/send-forget-password-code',authController.sendForgotPasswordCode);
router.post('/verify-forget-password-code',authController.verifyForgotPasswordCode);
module.exports=router;