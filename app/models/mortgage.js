import DS from 'ember-data';

export default DS.Model.extend({
    brokerage_id: DS.attr('string'),
    agent_id: DS.attr('string'),
    dear: DS.attr('string'),
    applicants: DS.hasMany('applicant', {async: true})
});
