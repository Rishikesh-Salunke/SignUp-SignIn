var express = require('express');
var router = express.Router();
const usercontroller = require('../controllers/user.controller')
const validatesignin = require('../controllers/validators')
router.post('/login', validatesignin.validateSignInReq, usercontroller.signin)
module.exports = router;