const connection = require('../connection/connection')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String,
        required: 'This field is required'
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: 'This field is required'
    },
    hash_password: {
        type: String,
        required: 'This field is required'

    }

})

const Users = mongoose.model('Users', userSchema)
module.exports = Users