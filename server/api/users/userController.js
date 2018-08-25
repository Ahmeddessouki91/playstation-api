const User = require('./userModel');
const _ = require('lodash');

exports.findByParam = (req, res, next,id) => {
    User.findById(id).then(function (user) {
        if (!user) {
            next(new Error('No Users with that id'));
        } else {
            req.user = user;
            next();
        }
    }, function (err) {
        next(err);
    });
}

exports.get = (req, res, next) => {
    User.find().then((result) => {
		res.json(result);
    }).catch((e) => {
        res.status(400).send();
    })
}

exports.getOne = (req, res, next) => {
    const user = req.user;
    res.json(user);
}

exports.post = (req, res, next) => {
    let body = req.body;
    let user = new User(body);
    user.save().then((doc) => {
        res.status(200).json(doc);
    }).catch((e) => {
        res.status(400).send(e);
    })
}

exports.put = (req, res, next) => {
    let user = req.user;

    const update = req.body;

    _.merge(user, update);

    user.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
}

exports.delete = function (req, res, next) {
    req.user.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

