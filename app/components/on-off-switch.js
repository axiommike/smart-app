import Ember from 'ember';
const { Checkbox } = Ember;

export default Checkbox.extend({
  classNameBindings: [':on-off-switch', 'checked'],
  attributeBindings: ['onMessage', 'offMessage'],
  onMessage: 'Yes',
  offMessage: 'No'
});
