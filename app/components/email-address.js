import Ember from "ember";

export default Ember.Component.extend({
	email: null,
	hasEmail: Ember.computed.notEmpty("email"),
	tagName: "a",
	attributeBindings: ["href", "title"],
	classNameBindings: [":email", "hasEmail"],
	href: Ember.computed("number", function() {
		if (this.get("hasEmail")) {
			return `mailto:${this.get("email")}`;
		}
	})
});
