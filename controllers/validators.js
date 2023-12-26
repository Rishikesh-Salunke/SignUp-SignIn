const { check, body, validationResult } = require("express-validator");

const validateSignUpReq = [body('first_name')
    .notEmpty()
    .withMessage("first_Name is required"),
    body('email')
    .notEmpty()
    .withMessage('Please enter valid email'),
    body('password')
    .isLength({ min: 6, })
    .withMessage('Please Maintain minimum length')
];

const validateSignInReq = [
    body("email").isEmail().withMessage("Valid Email required"),

]


module.exports = { validateSignUpReq, validateSignInReq }