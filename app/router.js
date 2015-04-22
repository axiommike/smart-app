import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.route("apply");
	this.route("apply", {path: "/apply/*catchall"});
	this.route("apply", {path: "/mortgage-application"});
	this.route("mortgage-application", {path: "/mortgage-application/:application_id"}, function () {
		this.route("basic-information");
		this.route("applicants");
		this.route("employment");
		this.route("summary");
		this.route("assets");
		this.route("thank-you");
		this.route("liabilities");
		this.route("income");
	});
});

export default Router;
