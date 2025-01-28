const express = require('express');
const { getAllUserPost } = require('../controllers/generalController');
const router = express.Router();

router.get('/home', getAllUserPost);

module.exports = router;