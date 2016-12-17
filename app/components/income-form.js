import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  income: null,
  isPension: false,
  incomeSources: [
    { label: 'Investment', value: 'investment' },
    { label: 'Child Support Alimony', value: 'child support alimony' },
    { label: 'Property Rental', value: 'property rental' },
    { label: 'Pension', value: 'pension' },
    { label: 'Other', value: 'other' }
  ],
  pensionTypes: [
    { label: 'Canada Pension Plan (CPP)', value: 'canada pension plan' },
    { label: 'Old Age Security', value: 'old age security' },
    { label: 'Work Pension', value: 'work pension' },
    { label: 'Other', value: 'other' }
  ],
  frequencies: [
    { label: 'Yearly', value: 'yearly' },
    { label: 'Monthly', value: 'monthly' }
  ],
  actions: {
    remove() {
      let value = this.get('income');
      this.sendAction('removeIncome', value);
    },
    changeFrequencies(frequency) {
      this.set('income.frequency', frequency);
    },
    changeIncomeSource(value) {
      this.set('income.income_source', value);
      switch (value) {
        case 'pension':
          this.set('isPension', true);
          break;
        default:
          this.set('isPension', false);
          break;
      }
    },
    changePensionSource(value) {
      this.set('income.pension_source', value);
    }
  }
});
