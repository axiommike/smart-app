import Ember from "ember";

export function initialize(container, application) {
	let src = "https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places";
	var promise;
	return Ember.$.getScript(src + "&callback=__emberGoogleMapLoaded__").then((scriptFetched) => {
		window.fetchingGoogle = false;
	}).fail(function (jqXhr) {
		promise = null;
		window.__emberGoogleMapLoaded__ = null;
		reject(jqXhr);
	});
}

export default {
	name:       "google-map-autocomplete",
	initialize: initialize
};
