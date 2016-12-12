import DS from 'ember-data';

export default DS.Model.extend({
    brokerage_id: DS.attr('string'),
    agent_id: DS.attr('string'),
    dear: DS.attr('string'),
    comment: DS.attr('string'),
    down_payment: DS.attr('string'),
    down_payment_source: DS.attr('string'),
    down_payment_explanation: DS.attr('string'),
    applicants: DS.hasMany('applicant', {async: true}),
    otherProperties: DS.hasMany('property', {async: true}),
    assets: DS.hasMany('asset', {async: true}),
    vehicles: DS.hasMany('vehicle', {async: true}),
    liabilities: DS.hasMany('liability', {async: true})
});
