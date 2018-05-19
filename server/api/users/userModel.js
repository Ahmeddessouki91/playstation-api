const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const config = require('./../../config/config')


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;

    var access = "Bearer";
    var token = jwt.sign({ _id: user._id, access }, config.secrets.jwt
        , { expiresIn: config.expireTime });
    // user.tokens.push({ access, token });

    // return user.save().then(() => {
    //     return token;
    // });

    return token;
};

UserSchema.statics.findByCredentials = function (username, password) {
    var User = this;
    return User.findOne({ username: username }).then((user) => {
        
        if (!user)
            return Promise.reject();

        return new Promise((resolve, reject) => {
            bycrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                }
                reject();
            });
        });
    });
}

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
});

module.exports = mongoose.model('user', UserSchema);
