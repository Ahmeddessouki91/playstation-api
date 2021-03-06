const _ = require('lodash');

let config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    expireTime: "10d",
    disableAuth:false,
    secrets: {
        jwt: process.env.JWT || 'poijasdf98435jpgfdpoij3'
    }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;


try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
} catch (e) {
    envConfig = {};
}

module.exports = _.merge(config, envConfig);