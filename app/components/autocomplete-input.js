import Ember from "ember";

export default Ember.TextField.extend({
	classNameBindings: [":autocomplete-input", "hasList"],
	attributeBindings: ["size"],
	hasList: Ember.computed.notEmpty("datalist"),
	datalist: null, /* Corresponds to the `datalist` attribute on the input */
	size: Ember.computed("value.length", function() {
	return this.get("value.length") > 0 ? this.get("value.length") : 1;
}),
	didInsertElement: function() {
		// check that the datalist element is there.  If it isn't, warn the programmer
		if (this.get("hasList")) {
			let $list = Ember.$.find(`#${this.get("datalist")}`);
			if ($list.length === 0) {
				console.warn(`Could not find the datalist with an ID of ${this.get("datalist")}`);
			}
			else {
				// fix because this should work, but isn't
				this.$().attr("list", this.get("datalist"));
			}
		}
	}
});
