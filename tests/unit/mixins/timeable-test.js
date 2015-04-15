import Ember from "ember";
import TimeableMixin from "../../../mixins/timeable";
import {module, test} from "qunit";

module("TimeableMixin");

// Replace this with your real tests.
test("it works", function (assert) {
	var TimeableObject = Ember.Object.extend(TimeableMixin);
	var subject = TimeableObject.create();
	assert.ok(subject);
});
