import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("phone-number", "Integration | Component | phone number", {
	integration: true
});

test("it renders", function(assert) {
	// Set any properties with this.set("myProperty", "value");
	// Handle any actions with this.on("myAction", function(val) { ... });" + EOL + EOL +

	this.render(hbs`{{phone-number}}`);

	assert.equal(this.$().text().trim(), "");

	// Template block usage:" + EOL +
	this.render(hbs`
		{{#phone-number}}
			template block text
		{{/phone-number}}
	`);

	assert.equal(this.$().text().trim(), "template block text");
});

test("it renders proper area code", function(assert) {

});

test("it renders proper service code", function(assert) {

});

test("it renders proper extension", function(assert) {

});

test("it renders proper central office code", function(assert) {

});

test("it renders proper country code", function(assert) {

});
