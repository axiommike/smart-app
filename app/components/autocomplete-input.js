import Ember from "ember";

export default Ember.TextField.extend({
	classNameBindings: [":autocomplete-input", "hasList"],
	attributeBindings: ["list", "size"],
	hasList: Ember.computed.notEmpty("list"),
	list: null, /* Corresponds to the `list` attribute on the input */
	size: Ember.computed.alias("value.length"),
	didInsertElement: function() {
		// check that the datalist element is there.  If it isn't, warn the programmer
		if (this.get("hasList")) {
			let $list = Ember.$.find(`#${this.get("list")}`);
			if ($list.length === 0) {
				console.warn(`Could not find the datalist with an ID of ${this.get("list")}`);
			}
			else {
				// fix because this should work, but isn't
				this.$().attr("list", this.get("list"));
			}
		}
	}
});
