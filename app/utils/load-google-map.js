import Ember from "ember";

var promise;

window.mapsLoaded = false;

/**
 * Loads the google map SDK
 *
 * @return {Ember.RSVP.Promise}
 */
export default function loadGoogleMap(resolveWith) {
	var src = "https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places";
	if (!window.mapsLoaded) {
		window.mapsLoaded = true;
		// promise making sure the script is loaded
		return promise = new Ember.RSVP.Promise(function (resolve, reject) {
			window.__emberGoogleMapLoaded__ = Ember.run.bind(function () {
				promise = null;
				window.__emberGoogleMapLoaded__ = null;
				resolve(resolveWith);
			});
			Ember.$.getScript(src + "&callback=__emberGoogleMapLoaded__").fail(function (jqXhr) {
				promise = null;
				window.__emberGoogleMapLoaded__ = null;
				reject(jqXhr);
			});
		});
	}
	else if (promise) {
		// we already have the promise loading the script, use it as the core promise to wait for but
		// resolve to what was given this time
		return promise.then(function () {
			return resolveWith;
		});
	}
	else {
		// no need to do anything, resolve directly
		return Ember.RSVP.resolve(resolveWith);
	}
}
