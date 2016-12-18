import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
const { computed } = Ember;

export default Model.extend({
  assetType: attr("string"),
  bank: attr("string"),
  description: attr("string"), /* Primarily used for "other" type */
  ownership: attr("string"),
  value: attr("number", { defaultValue: 0 }),
  valueType: attr("string"),

  applicant: belongsTo("applicant"),

  isPersonalItem: computed.equal("type", "item"),
  isSavings: computed.equal("type", "savings"),
  isInvestment: computed.equal("type", "investment"),
  isProperty: computed.equal("type", "property"),
  isGIC: computed.equal("type", "gic"),
  isRRSP: computed.equal("type", "rrsp"),
  isVehicle: computed.equal("type", "vehicle"),
  isOther: computed.equal("type", "other"),
});
