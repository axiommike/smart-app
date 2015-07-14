import Ember from "ember";
import loadGoogleMap from "../utils/load-google-map";

export function initialize(container, application) {
	application.register("util:load-google-map", loadGoogleMap, {instantiate: false});
	application.inject("route", "loadGoogleMap", "util:load-google-map");
}

export default {
	name:       "google-map-autocomplete",
	initialize: initialize
};
