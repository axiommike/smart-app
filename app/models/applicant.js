import DS from 'ember-data';

export default DS.Model.extend({
    first_name: DS.attr('string'),
    last_name: DS.attr('string'),
    email: DS.attr('string'),
    home_phone: DS.attr('string'),
    referral_source: DS.attr('string'),
    referred_friend: DS.attr('string'),
    referred_agent: DS.attr('string'),
    referred_other: DS.attr('string'),
    type: DS.attr('string'),
    down_payment: DS.attr('string'),
    down_payment_source: DS.attr('string'),
    down_payment_explanation: DS.attr('string'),
    comment: DS.attr('string'),
    agent_id: DS.attr('string'),
    relationship: DS.attr('string'),
    marital_status: DS.attr('string'),
    agent: DS.belongsTo('agent'),
    addresses: DS.hasMany('address', {async: true}),
    employments: DS.hasMany('employment', {async: true}),
    incomes: DS.hasMany('income', {async: true})
});