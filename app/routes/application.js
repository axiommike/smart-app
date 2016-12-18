import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  actions: {
    sendIncomplete(model) {
      model.save().then((model) => {
        let applicant = model;
        if (model.constructor.modelName === 'mortgage') {
          applicant = model.get('applicants').toArray()[0];
        }
        this.transitionTo('thank-you', { queryParams: { id: applicant.get('id'), is_incomplete: true } });
      });
    }
  }
});
