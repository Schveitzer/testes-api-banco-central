import nconf from 'nconf';

nconf.argv().env().file({
    file: 'config/config.json',
});

module.exports = nconf;
