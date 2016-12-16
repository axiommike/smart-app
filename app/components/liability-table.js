import Ember from 'ember';
import EditableMixin from '../mixins/editable';
const { A, Component, computed } = Ember;

export default Component.extend(EditableMixin, {
  tagName: 'liability-table',
  classNameBindings: [':liability-table', 'hasLiabilities'],
  liabilities: A(),
  onAdd: null, /* Override method for adding a liability */
  onRemove: null,
  showApplicant: false,
  type: null,
  typeName: computed('type', function() {
    return this.get('type') ? this.get('type') : 'Liability';
  }),
  hasLiabilities: computed.notEmpty('filteredLiabilities'),
  totalLiabilities: function() {
    // let assets = this.get('filteredLiabilities');
    return 0;
  }.property('filteredLiabilities.@each.payment'),

  actions: {
    addLiability() {
      if (this.get('onAdd')) {
        this.sendAction('onAdd', this.get('type'));
      }      else {
        let store = this.get('targetObject.store');
        let type = this.get('type');
        let liabilities = this.get('liabilities');
        let createdLiability = store.createRecord('liability');
        if (type) {
          createdLiability.set('type', type);
        }
        liabilities.pushObject(createdLiability);
      }
    },
    removeLiability(liability) {
      this.sendAction('onRemove', liability);
    }
  }
});
