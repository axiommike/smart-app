import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
	asset: DS.belongsTo("asset"),
	loan: DS.belongsTo("liability"),
	make: DS.attr("string"),
	model: DS.attr("string"),
	year: DS.attr("number", {defaultValue: new Date().getFullYear()}),
	infoChanged: function() {
		if (this.get("year") && !Ember.isBlank(this.get("make"))) {
			let model = !Ember.isBlank(this.get("model")) ? `${this.get("model")} ` : "",
				vehicleDescription = `${this.get("make")} ${model}- ${this.get("year")}`;
			if (this.get("asset")) {
				this.set("asset.description", vehicleDescription);
			}
			if (this.get("loan")) {
				this.set("loan.description", vehicleDescription);
			}
		}
	}.observes("make", "year", "model"),
	applicant: DS.belongsTo("applicant")
});
