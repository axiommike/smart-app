import Ember from "ember";

export default Ember.Component.extend({
	classNamespace: "form-section",
	tagName: "fieldset",
	title: null,
	titleClassName: (function() {
		return "" + (this.get("classNamespace")) + "-title";
	}).property("classNamespace"),
	classNameBindings: ["classNamespace"],
	icon: null
});
