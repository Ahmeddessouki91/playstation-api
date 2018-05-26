var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: 'game'
    },
    isLimited: {
        type: Boolean,
        required: true
    },
    isMulti: {
        type: Boolean,
        default: false
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    isCheckout: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('time', TimeSchema);
