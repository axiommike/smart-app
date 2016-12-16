import Ember from 'ember';
const { computed, Mixin } = Ember;

export default Mixin.create({
  isEditing: computed.not('isEditable'),
  isEditable: false,
  actions: {
    toggleEditing() {
      this.toggleProperty('isEditing');
    }
  }
});
