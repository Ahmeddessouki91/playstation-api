var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/testDate');

var schema = new Schema({
    created: Date
    , data: {}
});

var A = mongoose.model('A', schema);
var start = new Date();
start.setHours(0, 0, 0, 0);

var end = new Date();
end.setHours(23, 59, 59, 999);
mongoose.connection.on('open', function () {
    A.find({ created: { $gte: start, $lt: end } }, function (err, docs) {
        if (err) console.error(err.stack || err);
        console.error('found', docs);
    });
});