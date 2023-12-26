const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Users = require('../model/users.model')
    // const Users = mongoose.model('Users')
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator');
const { response } = require('../app');


module.exports = {
    signUp: async(req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400)
            res.json(errors)
        } else {

            const { first_name, last_name, email, password } = req.body;
            if (!first_name || !last_name || !email || !password) {
                res.status(400)
                res.json({ message: "Please Provide Required Information" })

            }

            const hash_password = bcrypt.hashSync(password, 10)

            const UserData = {
                first_name,
                last_name,
                email,
                hash_password

            }
            const user = await Users.findOne({ email });
            if (user) {
                res.status(400)
                res.json({ message: "User Already Exists" })
            } else {
                Users.create(UserData)
                    .then(() => {
                        res.status(200)
                        res.json({ message: "User Created Successfully" })
                    })
                    .catch(err => {
                        res.status(400)
                        res.json({ message: err })
                    })
            }
        }
    },

    signin: async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors)
        } else {

            if (!req.body.email || !req.body.password) {
                res.status(400)
                res.json({ message: 'Email and password required.' })

            } else {
                const user = await Users.findOne({ email: req.body.email });
                if (user) {
                    isSame = bcrypt.compareSync(req.body.password, user.hash_password);
                    if (isSame) {
                        let token = jwt.sign({
                                email: user.email
                            },
                            "secretKey", { algorithm: "HS256", expiresIn: "1h" });
                        res.status(200)
                        res.json({ error: false, token: token, message: 'User logged in sucessfully' })

                    } else {
                        res.status(400)
                        res.json({ message: 'Wrong email or password' })
                    }
                } else {
                    res.status(404)
                    res.json({ message: 'User not found' })
                }
            }
        }
    },

    getAllusers: (req, res) => {
        const allusers = Users.find({}, ['first_name', 'last_name', 'email'])
            .then((allusers) => {
                res.status(200)
                res.json({ message: 'Users List', data: allusers })
            })
            .catch(err => {
                res.status(400)
                res.json({ message: err })
            })
    }
}