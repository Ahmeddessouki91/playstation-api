const Game = require('./gameModel');
const _ = require('lodash');

exports.findByParam = (req, res, next) => {
    Game.findById(id).populate('categories')
    .exec().then(function (game) {
        if (!game) {
            next(new Error('No post with that id'));
        } else {
            req.game = game;
            next();
        }
    }, function (err) {
        next(err);
    });
}

exports.get = (req, res, next) => {
    Game.find().populate('categories')
    .exec().then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send();
    })
}

exports.getOne = (req, res, next) => {
    const game = req.game;
    res.json(game);
}

exports.post = (req, res, next) => {
    let body = req.body;
    let game = new Game(body);
    game.save().then((doc) => {
        res.status(200).json(doc);
    }).catch((e) => {
        res.status(400).send(e);
    })
}

exports.put = (req, res, next) => {
    let game = req.game;

    const update = req.body;

    _.merge(game, update);

    Game.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
}

exports.delete = function (req, res, next) {
    req.game.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

