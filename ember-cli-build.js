/* global require, module */
var EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
	var app = new EmberApp(defaults, {
		fingerprint: {
			exclude: [
				"android-icon-36x36.png",
				"android-icon-48x48.png",
				"android-icon-72x72.png",
				"android-icon-96x96.png",
				"android-icon-144x144.png",
				"android-icon-192x192.png",
				"apple-icon.png",
				"apple-icon-57x57.png",
				"apple-icon-60x60.png",
				"apple-icon-72x72.png",
				"apple-icon-76x76.png",
				"apple-icon-114x114.png",
				"apple-icon-120x120.png",
				"apple-icon-144x144.png",
				"apple-icon-152x152.png",
				"apple-icon-180x180.png",
				"apple-icon-precomposed.png",
				"favicon-16x16.png",
				"favicon-32x32.png",
				"favicon-96x96.png",
				"ms-icon-70x70.png",
				"ms-icon-144x144.png",
				"ms-icon-310x310.png",
				"ms-icon-150x150.png",
				"assets/fonts/icomoon/style.css",
				"assets/fonts/icomoon/ie7/ie7.css",
				"assets/fonts/icomoon/ie7/ie7.js",
				"assets/fonts/icomoon/liga.js",
				"assets/fonts/icomoon/demo-files/demo.css",
				"assets/fonts/icomoon/demo.html",
				"assets/fonts/icomoon/demo-files/demo.js",
				"assets/fonts/icomoon/PNG"
			]
		},
		"ember-cli-preloader": {
			paths: {
				html: "app/preloader/preloader.html",
				css: "app/preloader/preloader.css"
			}
		}
	});

	/* Use `app.import` to add additional libraries to the generated output files.
	 If you need to use different assets in different environments, specify an object as the first parameter. That object"s keys should be the environment name and the values should be the asset to use in that environment.
	 If the library that you are including contains AMD or ES6 modules that you would like to import into your application please specify an object with the list of modules as keys along with the exports of each module as its value. */

	return app.toTree();
};
