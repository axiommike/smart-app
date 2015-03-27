import Ember from "ember";

export default Ember.Component.extend({
	tagName: "section",
	classNamespace: "form-field",
	classNameBindings: ["fullClassName"],
	layoutDirection: "horizontal",
	defaultClassName: "form-field",
	title: null,
	fullClassName: (function() {
		return "" + (this.get("defaultClassName")) + "-" + (this.get("layoutDirection"));
	}).property("layoutDirection"),
	model: null,
	labelText: null,
	labelID: (function() {
		if (this.get("title") != null) {
			return Ember.String.dasherize(this.get("title"));
		}
	}).property("title"),
	labelClassName: (function() {
		return "" + (this.get("classNamespace")) + "-label";
	}).property("classNamespace"),
	controlsClassName: (function() {
		return "" + (this.get("classNamespace")) + "-controls";
	}).property("classNamespace")
});
