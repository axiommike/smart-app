import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
	location: config.locationType,
	metrics: Ember.inject.service(),
	didTransition() {
		this._super(...arguments);
		this._trackPage();
	},
	_trackPage() {
		Ember.run.scheduleOnce("afterRender", this, () => {
			const page = document.location.href;
			const title = Ember.getWithDefault(this, "routeName", "unknown");

			console.log(`Sending analytics data for page ${page} with title ${title}`);
			Ember.get(this, "metrics").trackPage({page, title});
		});
	}
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
