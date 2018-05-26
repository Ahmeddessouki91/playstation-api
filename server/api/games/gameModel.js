var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    avaliable: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    }
});

module.exports = mongoose.model('game', GameSchema);
