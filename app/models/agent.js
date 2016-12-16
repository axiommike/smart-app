import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  image: attr('string'),
  email: attr('string'),
  website: attr('string'),
  full_name: attr('string'),
  home_phone: attr('string'),
  cell_phone: attr('string'),
  work_phone: attr('string'),
  brokerage_id: attr('string'),
  brokerage: belongsTo('brokerage')
});
