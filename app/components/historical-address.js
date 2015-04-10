import Ember from "ember";

export default Ember.Component.extend({
	tagName: "historical-address",
	required: false, /* Whether all the fields are required or not */
	classNameBindings: ["required", "tagName", "address"],
	address: null,
	showFullAddress: true,
	typeName: Ember.computed("address", function() {
		return this.get("address") ? `${this.get("address.isCurrent") ? "Current" : "Previous"} Address` : "Unknown Address";
	})
});
