import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  start: 1950,
  end: new Date().getFullYear(),
  prompt: null,
  required: false,
  title: null,
  value: null,
  years: computed('start', 'end', function() {
    let result = [];
    for (let i = this.get('start'); i <= this.get('end'); i++) {
      result.push(i);
    }
    return result;
  })
});
