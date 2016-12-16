import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  optionValuePath: null,
  optionLabelPath: null,
  content: null,
  prompt: null,
  required: null,
  value: null,
  actions: {
    selectOne(value) {
      this.sendAction('change', value);
    }
  },
  didRender() {
    let value = this.get('value');
    if (value) {
      this.$().find(`option[value="${  value  }"]`).attr('selected', 'selected');
    }
  }
});
