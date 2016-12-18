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
    {
      currencyLabel: 'Item Value',
      currencyTitle: 'Please indicate the value of this personal item',
      selectLabel: 'Personal Item',
      selectValue: 'item'
    },
    {
      currencyLabel: 'Account Balance',
      currencyTitle: 'Please indicate the value of this account',
      selectLabel: 'Savings Account',
      selectValue: 'savings'
    }, /* Chequing, savings accounts */
    {
      currencyLabel: 'GIC Account Balance',
      currencyTitle: 'Please indicate the amount you have invested this GIC account',
      selectLabel: 'GIC, Term Deposit',
      selectValue: 'gic'
    },
    {
      selectLabel: 'RESP (Registered Educational Savings Plan)',
      selectValue: 'resp',
    },
    {
      currencyLabel: 'Asset/Bond Investment Value',
      currencyTitle: 'Please indicate the amount you invested',
      selectLabel: 'Stocks/Bonds Investment',
      selectValue: 'investment'
    },
    {
      currencyLabel: 'RRSP Account Balance',
      currencyTitle: 'Please indicate the amount you have invested this RRSP account',
      selectValue: 'rrsp',
      selectLabel: 'RRSP'
    },
    {
      currencyLabel: 'Estimated Vehicle Value',
      currencyTitle: 'Please provide an estimation of your vehicle\'s value',
      selectValue: 'vehicle',
      selectLabel: 'Vehicle' },
    {
      currencyLabel: 'Estimated Propery Value',
      currencyTitle: 'Please indicate the estimated property value',
      selectValue: 'property',
      selectLabel: 'Property' },
    {
      currencyLabel: 'Asset Value',
      currencyTitle: '',
      selectValue: 'other',
      selectLabel: 'Other'
    }
  ],
  savingsTypes: [
    { selectValue: 'savings', selectLabel: 'Savings Account' },
    { selectValue: 'chequing', selectLabel: 'Chequing Account' },
    { selectValue: 'other', selectLabel: 'Other' }
  ],
  assetInfo: computed('asset.assetType', function() {
    return this.get('assetTypes').findBy('selectValue', this.get('asset.assetType'));
  }),
  hasBank: computed.or('asset.isSavings', 'asset.isGIC', 'asset.isRESP', 'asset.isInvestment', 'asset.isRRSP'),
  showAmount: computed.or('hasBank', 'asset.isOther', 'asset.isVehicle'),
  actions: {
    remove() {
      this.sendAction('onRemove', this.get('asset'));
    }
  }
});
