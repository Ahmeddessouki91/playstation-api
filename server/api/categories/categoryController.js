const Category = require('./categoryModel');
const _ = require('lodash');

exports.findByParam = (req, res, next) => {
    Category.findById(id).then(function (category) {
        if (!category) {
            next(new Error('No post with that id'));
        } else {
            req.category = category;
            next();
        }
    }, function (err) {
        next(err);
    });
}

exports.get = (req, res, next) => {
    Category.find().then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send();
    })
}

exports.getOne = (req, res, next) => {
    const category = req.category;
    res.json(category);
}

exports.post = (req, res, next) => {
    let body = req.body;
    let cateogry = new Category(body);
    cateogry.save().then((doc) => {
        res.status(200).json(doc);
    }).catch((e) => {
        res.status(400).send(e);
    })
}

exports.put = (req, res, next) => {
    let category = req.category;

    const update = req.body;

    _.merge(category, update);

    Category.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
}

exports.delete = function (req, res, next) {
    req.category.remove(function (err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

