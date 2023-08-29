const path = require('node:path');

module.exports = function override(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
};