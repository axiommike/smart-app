import {
	moduleForComponent,
	test
	} from "ember-qunit";

moduleForComponent("autocomplete-input", {
	// Specify the other units that are required for this test
	// needs: ["component:foo", "helper:bar"]
});

test("it renders", function (assert) {
	assert.expect(2);

	// Creates the component instance
	var component = this.subject();
	assert.equal(component._state, "preRender");

	// Renders the component to the page
	this.render();
	assert.equal(component._state, "inDOM");
});

test("it warns the user when no datalist element is present", function(assert) {
	let component = this.subject();
	this.render();
	assert.equal(component.get("hasList"), false);
});

test("it adds the datalist attribute when a list is set", function(assert) {
	assert.expect(2);
	let component = this.subject(), listName = "test-list";
	component.set("list", listName);
	this.render();

	assert.ok(component.get("hasList"));
	assert.equal(component.$().attr("list"), listName);
});

test("it automatically adjusts size with input", function(assert) {
	assert.expect(2);
	let component = this.subject(), lengthyText = "lorem ipsum dolor my ass", lengthyTextLength = lengthyText.length;
	component.set("value", lengthyText);
	this.render();
	assert.ok(component.$().attr("size"));
	assert.equal(component.$().attr("size"), lengthyTextLength);
});

test("it doesn't set size to 0 when there is no input", function(assert) {
	let component = this.subject();
	this.render();
	assert.equal(component.$().attr("size"), "");
});
