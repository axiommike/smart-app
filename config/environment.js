/* jshint node: true */

module.exports = function (environment) {
	var ENV = {
		modulePrefix: "smart-app",
		environment: environment,
		baseURL: "/",
		locationType: "auto",
		intl: {
			defaultLocale: "en-ca",
			locales: ["en-ca"]
		},
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build e.g. "with-controller": true
			}
		},
		contentSecurityPolicy: {
			"default-src": "'none'",
			"script-src": "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com *.google-analytics.com about:blank",
			"font-src": "'self' fonts.gstatic.com",
			"connect-src": "'self' maps.gstatic.com *.axiomdev.ca localhost:81 *.axiomdev.ca/* *.google-analytics.com",
			"img-src": "'self' data: *",
			"style-src": "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com",
			"media-src": "'self'"
		},
		manifest: {
			enabled: true,
			appcacheFile: "/manifest.appcache",
			excludePaths: ["assets/components", "assets/fonts"],
			fallback: ["/ /index.html"],
			includePaths: ["/"],
			network: ["*"],
			showCreateDate: true
		},
		rollbar: {
			accessToken: "afc0559d27ab4a2b824225c1aedb513d"
		},
		metricsAdapters: [
			{
				name: "GoogleAnalytics",
				environments: ["development", "production"],
				config: {
					id: "UA-67882355-1"
				}
			}
		],
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
		ENV.apiURL = "http://api.axiomdev.ca"
	}

	if (environment === "test") {
		// Testem prefers this...
		ENV.baseURL = "/";
		ENV.locationType = "none";

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = "#ember-testing";
		ENV.apiURL = "http://api.axiomdev.ca"
	}

	if (environment === "production") {
		ENV.apiURL = "https://api.axiomdev.ca"
	}

	return ENV;
};
