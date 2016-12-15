import Ember from "ember";
const { Component, computed, inject: {service} } = Ember;

export default Component.extend({
    store: service(),
    employments: [],
    currentEmployment: null,
    person_id: null,
    minHistory: 3,
    totalEmploymentTimespan: computed("employments.@each.tenure_year", function() {
        return this.get("employments").reduce((previousValue, employment) => {
            return parseInt(previousValue) + parseInt(employment.get("tenure_year") || 0);
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
