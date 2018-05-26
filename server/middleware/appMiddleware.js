const _ = require('lodash');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const dir = path.join(__dirname, '../public');
	
module.exports = (app,express) => {
    app.use(cors());
	app.use(express.static(dir));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}