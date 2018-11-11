const express = require('express');
const router = express.Router();

let User = require('../models/user');

//Register form
router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;
