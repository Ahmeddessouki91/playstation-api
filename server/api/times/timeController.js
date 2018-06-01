const Time = require('./timeModel');
const _ = require('lodash');
const moment = require('moment');

exports.findByParam = (req, res, next, id) => {
    Time.findById(id).populate('game')
        .exec().then(function (time) {
            if (!time) {
                next(new Error('No post with that id'));
            } else {
                req.time = time;
                next();
            }
        }, function (err) {
            next(err);
        });
}

exports.get = (req, res, next) => {
    let filter = req.query.filter;

    var query = {};
    if (filter) {
        var start = moment().startOf(filter);
        var end = moment().endOf(filter);
        query = { startTime: { $gte: start, $lt: end }};
    }
    Time.find(query).populate({ path: 'game', populate: { path: 'category' } })
        .exec().then((result) => {
            res.send(result);
        }).catch((e) => {
            res.status(400).send();
        });
}

exports.getOne = (req, res, next) => {
    const time = req.time;
    res.json(time);
}

exports.post = (req, res, next) => {
    let body = req.body;
    let time = new Time(body);
    time.save().then((doc) => {
        res.status(200).json(doc);
    }).catch((e) => {
        res.status(400).send(e);
    })
}

exports.put = (req, res, next) => {
    let time = req.time;

    const update = req.body;

    time = _.merge(time, update);

    time.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
}

exports.delete = function (req, res, next) {
    req.time.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

