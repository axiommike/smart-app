import DS from 'ember-data';

export default DS.Model.extend({
    first_name: DS.attr('string'),
    last_name: DS.attr('string'),
    email: DS.attr('string'),
    phone: DS.attr('string'),
    referral_source: DS.attr('string'),
    referred_friend: DS.attr('string'),
    referred_agent: DS.attr('string'),
    referred_other: DS.attr('string'),
    type: DS.attr('string'),
    down_payment: DS.attr('string'),
    down_payment_source: DS.attr('string'),
    down_payment_explanation: DS.attr('string'),
    comment: DS.attr('string')
});