import Ember from 'ember';
import autosave from 'ember-autosave';
import EditableMixin from '../mixins/editable';
const { A, Component, computed, String: { capitalize } } = Ember;

export default Component.extend(EditableMixin, {
  properties: A(), /* Should resolve to the list of all added properties */
  creditCardTypes: [
		{ label: 'VISA', value: 'visa' },
		{ label: 'Mastercard', value: 'mastercard' },
		{ label: 'Amex', value: 'amex' },
		{ label: 'Store Card', value: 'store card' },
		{ label: 'Other', value: 'other' }
  ],
  liabilityTypes: [
		{ label: 'Credit Card', value: 'credit-card' },
		{ label: 'Personal Line of Credit', value: 'line-of-credit' },
		{ label: 'Loan', value: 'loan' },
		{ label: 'Auto Loan', value: 'auto-loan' },
		{ label: 'Child Support or Maintenance Payments', value: 'child-support' },
		{ label: 'Mortgage', value: 'mortgage' },
		{ label: 'Other', value: 'other' }
  ],
  loanTypes: [
    'Personal Loan or Consolidation Loan',
    'Student Loan'
  ],
  paymentFrequencies: [
    'Monthly',
    'Semi-Monthly',
    'Weekly',
    'Bi-Weekly',
    'Bi-Weekly Accelerated',
    'Bi-Monthly Accelerated'
  ],
  tagName: 'liability-instance',
  classNameBindings: [':liability-instance', 'liability.type'],
  showApplicant: false,
  liability: null,
  liabilityProxy: autosave('liability'),
  paymentLabel: computed('liability.paymentFrequency', function() {
    return `${capitalize(this.get('liability.paymentFrequency'))  } Payment`;
  }),
  typeEditingDisabled: false,
  onRemove: null,
  actions: {
    remove() {
      this.sendAction('onRemove', this.get('liability'));
    }
  }
});
