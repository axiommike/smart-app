import DS from "ember-data";
import PersonableMixin from "../mixins/personable";

export default DS.Model.extend(PersonableMixin, {
	image: DS.attr("string"), /* URL to the image of the agent -- hosted on myaxiom.ca/assets */
	position: DS.attr("string"),
	legacyId: DS.attr("string"),
	joomlaId: DS.attr("string"),
	biography: DS.attr("string"),
	slogan: DS.attr("string"),
	twitterUrl: DS.attr("string"),
	linkedinUrl: DS.attr("string"),
	facebookUrl: DS.attr("string"),
	blogUrl: DS.attr("string")
});
