import Ember from "ember";
import EditableMixin from "../mixins/editable";

export default Ember.Component.extend(EditableMixin, {
	tagName: "historical-address",
	required: false, /* Whether all the fields are required or not */
	classNameBindings: ["required", "tagName", "address"],
	address: null,
	showFullAddress: true,
	customLabelPrefix: null,
	showLabelPrefix: true,
	labelPrefix: Ember.computed("address", function() {
		return this.get("customLabelPrefix") ? this.get("customLabelPrefix") : this.get("address.isCurrent") ? "Current" : "Previous";
	}),
	label: Ember.computed("labelPrefix", function() {
		return this.get("showLabelPrefix") ? `${this.get("labelPrefix")} Address` : "Address";
	})
});
