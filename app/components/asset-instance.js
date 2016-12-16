import Ember from 'ember';
import EditableMixin from '../mixins/editable';
const { Component, computed } = Ember;

export default Component.extend(EditableMixin, {
  tagName: 'asset',
  classNameBindings: [':asset', 'asset.type'],
  onRemove: null,
  asset: null,
  showApplicant: false,
  assetTypes: [
        { value: 'item', label: 'Personal Item' },
        { value: 'savings', label: 'Savings Account' }, /* Chequing, savings accounts */
        { value: 'gic', label: 'GIC, Term Deposit' },
        { value: 'resp', label: 'RESP (Registered Educational Savings Plan)' },
        { value: 'investment', label: 'Stocks/Bonds Investment' },
        { value: 'rrsp', label: 'RRSP' },
        { value: 'vehicle', label: 'Vehicle' },
        { value: 'property', label: 'Property' },
        { value: 'other', label: 'Other' }
  ],
  hasBank: computed.or('asset.isSavings', 'asset.isGIC', 'asset.isRESP', 'asset.isInvestment', 'asset.isRRSP'),
  savingsTypes: [
        { value: 'savings', label: 'Savings Account' },
        { value: 'chequing', label: 'Chequing Account' },
        { value: 'other', label: 'Other' }
  ],
  actions: {
    remove() {
      this.sendAction('onRemove', this.get('asset'));
    }
  }
});
