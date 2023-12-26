var express = require('express');
var router = express.Router();
const validation = require('../controllers/validators')

const usercontroller = require('../controllers/user.controller')
router.post('/signup', validation.validateSignUpReq, usercontroller.signUp)
module.exports = router;