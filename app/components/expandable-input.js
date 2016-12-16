import Ember from 'ember';
const { computed, TextField } = Ember;

export default TextField.extend({
  type: 'text',
  defaultSize: 20,
  size: computed('value', function() {
    return this.get('value.length') > 0 ? this.get('value.length') + 1 : this.get('defaultSize');
  })
});
