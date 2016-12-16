import Ember from 'ember';
const { $, computed, Logger: { warn }, TextField } = Ember;

export default TextField.extend({
  classNameBindings: [':autocomplete-input', 'hasList'],
  attributeBindings: ['size'],
  hasList: computed.notEmpty('datalist'),
  datalist: null, /* Corresponds to the `datalist` attribute on the input */
  size: computed('value.length', function() {
    return this.get('value.length') > 0 ? this.get('value.length') : 1;
  }),
  didInsertElement() {
        // check that the datalist element is there.  If it isn't, warn the programmer
    if (this.get('hasList')) {
      let $list = $.find(`#${this.get('datalist')}`);
      if ($list.length === 0) {
        warn(`Could not find the datalist with an ID of ${this.get('datalist')}`);
      }      else {
                // fix because this should work, but isn't
        this.$().attr('list', this.get('datalist'));
      }
    }
  }
});
