/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'smart-app',
        environment: environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
            }
        },

        APP: {
        }
    };

    if (environment === 'development') {
        ENV.apiURL = 'http://api.axiomdev.ca';
    }

    if (environment === 'test') {
        ENV.locationType = 'none';
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;
        ENV.APP.rootElement = '#ember-testing';
        ENV.apiURL = 'http://api.axiomdev.ca';
    }

    if (environment === 'production') {
        ENV.apiURL = 'http://api.axiomdev.ca';
    }

    return ENV;
};
