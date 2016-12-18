import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  agent_id: attr('string'),
  brokerage_id: attr('string'),
  dear: attr('string'),
  comment: attr('string'),
  down_payment: attr('string'),
  down_payment_source: attr('string'),
  down_payment_explanation: attr('string'),

  applicants: hasMany('applicant', { async: true }),
  assets: hasMany('asset', { async: true }),
  liabilities: hasMany('liability', { async: true }),
  otherProperties: hasMany('property', { async: true }),
  vehicles: hasMany('vehicle', { async: true })
});
