import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.route("apply");
	this.route("wizard"); // simple redirect to apply
	this.route("agent"); // simple redirect to apply
	this.route("apply", {path: "/apply/*catchall"});
	this.route("apply", {path: "/mortgage-application"});
	this.route("mortgage-application", {path: "/mortgage-application/:application_id"}, function () {
		this.route("basic-information");
		this.route("applicants");
		this.route("summary");
		this.route("assets");
		this.route("thank-you");
		this.route("liabilities");
	});
});

export default Router;
