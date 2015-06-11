import DS from "ember-data";
import PersonableMixin from "../mixins/personable";

export default DS.Model.extend(PersonableMixin, {
	image: DS.attr("string"), /* URL to the image of the agent -- hosted on myaxiom.ca/assets */
	position: DS.attr("string"),
	biography: DS.attr("string"),
	slogan: DS.attr("string"),
	website: DS.attr("string"),
	address: DS.attr(),
	brokerage: DS.attr()
});
