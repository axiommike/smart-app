import {
	moduleForComponent,
	test
} from "ember-qunit";

moduleForComponent("phone-number", {
	// Specify the other units that are required for this test
	// needs: ["component:foo", "helper:bar"]
});

test("it sets country code to first number if it's a 1", function(assert) {
	let component = this.subject();
	component.set("number", "1");
	assert.equal(component.get("hasCountryCode"), true);
});

test("it sets area code to first 3 numbers after country code", function(assert) {
	let component = this.subject();
	component.set("number", "1403");
	assert.equal(component.get("hasAreaCode"), true);
	assert.equal(component.get("areaCode"), 403);
});
test ("it sets central office code to first 3 numbers after area code and country code when there is one", function(assert) {
	let component = this.subject();
	component.set("number", "1555625");
	assert.equal(component.get("hasCentralOfficeCode"), true);
	assert.equal(component.get("centralOfficeCode"), 625);
});

test("it sets central office code to first 3 numbers after area code", function(assert) {
	let component = this.subject();
	component.set("number", "555625");
	assert.equal(component.get("hasCentralOfficeCode"), true);
	assert.equal(component.get("centralOfficeCode"), 625);
});

test("it sets service code to last 4 numbers", function(assert) {
	let component = this.subject();
	component.set("number", "5556254793");
	assert.equal(component.get("hasServiceCode"), true);
	assert.equal(component.get("serviceCode"), 4793);
});
