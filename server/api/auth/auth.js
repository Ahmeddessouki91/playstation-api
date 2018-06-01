const config = require('./../../config/config')
const User = require('./../users/userModel');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const _ = require('lodash');
const checkToken = expressJwt({ secret: config.secrets.jwt });


const decodeToken = () => (req, res, next) => {
    if (config.disableAuth) {
        return next()
    }
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
}

const getFreshUser = () => {
    return (req, res, next) => {
        User.findById(req.user._id).then((user) => {
            if (!user)
                res.status(401).send('Unauthorized');
            else {
                req.user = user;
                next();
            }
        }).catch((e) => req.status(401).send('Unauthorized'));
    }
}

const authenticate = (req, res, next) => {
    console.log(req.user);
    next();
    var token = req.headers.authorization.split(' ')[1] || req.body.token || req.query.token

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send("Unauthorized");
    });
};

const signIn = (req, res, next) => {
    var body = _.pick(req.body, ['username', 'password']);

    User.findByCredentials(body.username, body.password).then((user) => {
        var token = user.generateAuthToken();
        res.json({ token, username: user.username, isAdmin: user.isAdmin });
    }).catch((e) => {
        res.status(400).send("Invalid username or password!");
    });
};

const register = (req, res, next) => {
    let body = req.body;
    let user = new User(body);
    user.save().then((res) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('Bearer', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
}

module.exports = { signIn, register, protect: [decodeToken(), getFreshUser()] };