const express = require('express');
const router = express.Router();
const { handleLogin, handleSignup,handleForgetPassword ,handleResetPassword} = require('../controllers/userController');

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.post('/forget-password', handleForgetPassword);
router.post('/reset-password/:resetToken',handleResetPassword )

module.exports = router;