const config = require('./../config/config');
const mongoose = require('mongoose');
const User = require('./../api/users/userModel');


mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, () => console.log('Connected'));

const initDB = () => {
    User.find().then((result) => {
        if (result.length > 0)
            return console.log('There are user found');
        let userObj = new User({
            username: "ahmed",
            password: 123456,
            isAdmin: true
        });
        userObj.save().then(doc => {
            console.log("user Added");
        })
    }).catch(err => console.log(err));


}

module.exports = { mongoose, initDB };
