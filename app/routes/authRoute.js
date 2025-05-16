const express = require('express');


const {
    register,
    login,
    getSingleUser,
} = require('../controller/auth/index');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/get-single-user', protect, getSingleUser);


module.exports = router;