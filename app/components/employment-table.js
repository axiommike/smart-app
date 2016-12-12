import Ember from "ember";

export default Ember.Component.extend({
    store: Ember.inject.service(),
    employments: [],
    currentEmployment: null,
    person_id: null,
    minHistory: 3,
    totalEmploymentTimespan: Ember.computed("employments.@each.tenure_year", function() {
        let allEmployment = this.get("employments");
        return allEmployment.reduce(function(previousValue, employment) {
            return previousValue + employment.get("tenure_year");
        }, 0);
    }),
    didReceiveAttrs() {
        //if (this.get('employments').length === 0) {
        //    this.set('currentEmployment', this.get('store').createRecord('employment', {
        //        person_id: this.get('person_id')
        //    }));
        //}
        this.set('currentEmployment', this.get('store').createRecord('employment', {
            person_id: this.get('person_id')
        }));
    },
    actions: {
        addEmployment() {
            this.get('employments').pushObject(this.get('store').createRecord('employment', {
                person_id: this.get('person_id')
            }));
        },
        removeEmployment(element) {
            this.get('employments').removeObject(element);
        }
    }
});
