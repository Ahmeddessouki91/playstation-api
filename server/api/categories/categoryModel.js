var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    multi_price:{
		type:Number,
		required:true
    },
    single_price:{
		type:Number,
		required:true
	}
});

module.exports = mongoose.model('category', CategorySchema);
