import Ember from "ember";

export default function() {
	this.transition(
		this.fromRoute("mortgage-application.index"),
		this.toRoute("mortgage-application.applicants"),
		this.use("toLeft"),
		this.reverse("toRight")
	);
	this.transition(
		this.fromRoute("mortgage-application.applicants"),
		this.toRoute("mortgage-application.assets"),
		this.use("toLeft"),
		this.reverse("toRight")
	);
	this.transition(
		this.fromRoute("mortgage-application.assets"),
		this.toRoute("mortgage-application.liabilities"),
		this.use("toLeft"),
		this.reverse("toRight")
	);
	this.transition(
		this.fromRoute("mortgage-application.liabilities"),
		this.toRoute("mortgage-application.summary"),
		this.use("toLeft"),
		this.reverse("toRight")
	);
	this.transition(
		this.fromRoute("mortgage-application.summary"),
		this.toRoute("mortgage-application.thank-you"),
		this.use("toLeft"),
		this.reverse("toRight")
	);
}
