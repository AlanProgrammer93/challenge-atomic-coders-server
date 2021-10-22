const express = require('express');
const { 
    register, 
    login, 
    currentUser
} = require('../controllers/auth');

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
//router.get('/current-user', requireSignin, currentUser);

module.exports = router;
