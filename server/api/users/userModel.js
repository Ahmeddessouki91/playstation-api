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
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'username','isAdmin']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;

    var access = "Bearer";
    var token = jwt.sign({ _id: user._id, access, isAdmin: user.isAdmin }, config.secrets.jwt
        , { expiresIn: config.expireTime });
    return token;
};

UserSchema.methods.encryptPassword = function (plainTextPword) {
    if (!plainTextPword) {
        return '';
    } else {
        const salt = bycrypt.genSaltSync(10);
        return bycrypt.hashSync(plainTextPword, salt);
    }
}

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
    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

module.exports = mongoose.model('user', UserSchema);
