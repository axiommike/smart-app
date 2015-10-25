import Ember from 'ember';
import PersonableMixin from '../../../mixins/personable';
import { module, test } from 'qunit';

module('Unit | Mixin | personable');

// Replace this with your real tests.
test('it works', function(assert) {
  var PersonableObject = Ember.Object.extend(PersonableMixin);
  var subject = PersonableObject.create();
  assert.ok(subject);
});
