import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "historical-address",
	required: false, /* Whether all the fields are required or not */
	classNameBindings: ["required", "tagName", "address"],
	address: null,
	showFullAddress: true,
	typeName: Ember.computed("address", function() {
		return this.get("address") ? `${this.get("address.isCurrent") ? "Current" : "Previous"} Address` : "Unknown Address";
	})
});
