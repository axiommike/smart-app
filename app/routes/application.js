import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  actions: {
    sendIncomplete(model) {
      model.save().then((applicant) => {
        this.transitionTo('thank-you', { queryParams: { id: applicant.get('id'), is_incomplete: true } });
      });
    }
  }
});
