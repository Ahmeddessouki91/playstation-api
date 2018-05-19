const _ = require('lodash');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

module.exports = (app) => {
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}