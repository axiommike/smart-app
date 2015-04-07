import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.route("apply", {path: ":application_id"}, function () {
		this.route("basic-information");
		this.route("applicants");
		this.route("employment");
		this.route("summary");
		this.route("assets");
		this.route("thank-you");
		this.route("liabilities");
	});
});

export default Router;
