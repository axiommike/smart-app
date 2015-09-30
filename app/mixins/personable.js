import Ember from "ember";
import DS from "ember-data";

export default Ember.Mixin.create({
	title: DS.attr("string"),
	firstName: DS.attr("string"),
	middleName: DS.attr("string"),
	lastName: DS.attr("string"),
	names: Ember.computed.collect("firstName", "lastName", "middleName"),
	hasName: Ember.computed.notEmpty("names"),
	fullName: Ember.computed("names", function() {
		return Ember.makeArray(this.get("names")).slice().concat().join(" ");
	}),
	email: DS.attr("string"),
	hasValidEmail: Ember.computed.match("email", /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i),
	phone: DS.attr("string"),
	workPhone: DS.attr("string"),
	homePhone: DS.attr("string"),
	preferredContactMethod: DS.attr("string"),
	prefersCellPhone: Ember.computed.equal("preferredContactMethod", "cellphone"),
	prefersWorkPhone: Ember.computed.equal("preferredContactMethod", "workphone"),
	prefersHomePhone: Ember.computed.equal("preferredContactMethod", "homephone"),
	prefersEmail: Ember.computed.equal("preferredContactMethod", "email")
});
