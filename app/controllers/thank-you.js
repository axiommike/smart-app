import Ember from 'ember';
const { computed, Controller } = Ember;

export default Controller.extend({
  queryParams: ['is_incomplete'],
  isIncomplete: computed.oneWay('is_incomplete'),
  actions: {
    completeFullApp() {
      window.history.back();
    }
  }
});
