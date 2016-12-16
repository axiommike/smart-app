import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  first_name: attr('string'),
  last_name: attr('string'),
  email: attr('string'),
  home_phone: attr('string'),
  referral_source: attr('string'),
  referred_friend: attr('string'),
  referred_agent: attr('string'),
  referred_other: attr('string'),
  type: attr('string'),
  down_payment: attr('string'),
  down_payment_source: attr('string'),
  down_payment_explanation: attr('string'),
  comment: attr('string'),
  agent_id: attr('string'),
  relationship: attr('string'),
  birth_date: attr('string'),
  marital_status: attr('string'),
  agent: belongsTo('agent'),
  addresses: hasMany('address', { async: true }),
  employments: hasMany('employment', { async: true }),
  incomes: hasMany('income', { async: true })
});
