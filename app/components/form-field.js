import Ember from "ember";

export default Ember.Component.extend({
	tagName: "section",
	classNamespace: "form-field",
	classNameBindings: ["fullClassName"],
	layoutDirection: "horizontal",
	defaultClassName: "form-field",
	title: null,
	childInput: null,
	hasChildInput: Ember.computed.notEmpty("childInput"),
	didInsertElement: function() {
		let $firstInput = this.$().find("input[id], select[id], textarea[id]").first();
		if (Ember.isArray($firstInput)) {
			if (!Ember.isBlank($firstInput.attr("title"))) {
				this.set("tipTitle", $firstInput.attr("title"));
			}
			this.setProperties({
				childInput: $firstInput
			});
		}
	},
	hasTitle: Ember.computed("title", function () {
		return !Ember.isNone(this.get("title")) && !Ember.isEmpty(this.get("title"));
	}),
	isFocused: false, /* To be set from child components */
	fullClassName: (function() {
		return "" + (this.get("defaultClassName")) + "-" + (this.get("layoutDirection"));
	}).property("layoutDirection"),
	model: null,
	labelText: null,
	tip: false,
	tipTitle: null,
	labelID: (function() {
		/*if (this.get("hasTitle")) {
			return Ember.String.dasherize(this.get("title"));
		}*/
		if (this.get("hasChildInput")) {
			return this.get("childInput")[0].id;
		}
	}).property("hasChildInput"),
	labelClassName: (function() {
		return "" + (this.get("classNamespace")) + "-label";
	}).property("classNamespace"),
	controlsClassName: (function() {
		return "" + (this.get("classNamespace")) + "-controls";
	}).property("classNamespace")
});
