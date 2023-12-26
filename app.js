var express = require('express');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const loginRouter = require('./routes/routes')
const signupRouter = require('./routes/signup.routes')
const connection = require('./connection/connection')
const controller = require('./controllers/user.controller')
const middleware = require('./middleware/jwt.middleware')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', loginRouter)
app.use('/users', signupRouter)
app.get('/allusers', middleware.checkToken, controller.getAllusers)



module.exports = app;