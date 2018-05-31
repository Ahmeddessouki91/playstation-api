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
    isCheckout: {
        type: Boolean,
        default: false
    },
    isPause: {
        type: Boolean,
        default: false
    },
    usedTime: {
        type: Number,
        default: 0
    },
    limitedTime: {
        type: Number,
        default: 0
    },
	isFinish:{
		 type: Boolean,
        default: false
	},
    totalPrice: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('time', TimeSchema);
