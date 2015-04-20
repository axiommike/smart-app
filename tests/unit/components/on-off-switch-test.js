import {
	moduleForComponent,
	test
	} from "ember-qunit";

moduleForComponent("on-off-switch", {
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

test("it has corresponding on/off data attributes", function(assert) {
	assert.expect(2);
	let component = this.subject();
	this.render();
	assert.ok(component.$().attr("onMessage"));
	assert.ok(component.$().attr("offMessage"));
});