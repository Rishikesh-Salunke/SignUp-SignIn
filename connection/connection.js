const mongoose = require('mongoose');


connection = mongoose.connect('mongodb+srv://dhiwarebhushan8:HwGLi8O3F4O42cRx@cluster0.jsu8uai.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch(err => {
        console.log("connection to db Failed", err)
    })

module.exports = connection;