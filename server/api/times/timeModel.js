var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeSchema = new Schema({
    device: {
        type: Schema.Types.ObjectId,
        ref: 'device'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    start: {
        type: Date,
        required: true,
        default: Date.now
    },
    end: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('time', TimeSchema);
