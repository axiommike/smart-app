import Ember from 'ember';
const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  incomes: [],
  person_id: null,
  totalIncome: computed('incomes.@each.value', function() {
    let income = this.get('incomes');
    return income.reduce(function(previousValue, income) {
      return previousValue + parseInt(income.get('yearlyValue'));
    }, 0);
  }),
  actions: {
    addIncome() {
      this.get('incomes').addObject(this.get('store').createRecord('income', {
        person_id: this.get('person_id')
      }));
    },
    removeIncome(element) {
      this.get('incomes').removeObject(element);
    }
  }
});
