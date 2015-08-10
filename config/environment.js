/* jshint node: true */

module.exports = function (environment) {
	var ENV = {
		modulePrefix: "smart-app",
		environment:  environment,
		baseURL:      "/",
		locationType: "hash",
		EmberENV:     {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build e.g. "with-controller": true
			}
		},
		contentSecurityPolicy: {
			"default-src": "'none'",
			"script-src":  "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
			"font-src":    "'self' fonts.gstatic.com",
			"connect-src": "'self' maps.gstatic.com insights.hotjar.com *.myaxiom.ca localhost:81 *.myaxiom.ca/*",
			"img-src":     "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com *.gravatar.com *.myaxiom.ca",
			"style-src":   "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
		},
		manifest: {
			enabled: true,
			appcacheFile: "/manifest.appcache",
			excludePaths: ["assets/components"],
			fallback: ["/ index.html"],
			includePaths: ["/"],
			network: ["api/"],
			showCreateDate: true
		},
		APP: {
			// Here you can pass flags/options to your application instance when it is created
		}
	};

	if (environment === "development") {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === "test") {
		// Testem prefers this...
		ENV.baseURL = "/";
		ENV.locationType = "none";

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = "#ember-testing";
	}

	if (environment === "production") {

	}

	return ENV;
};
