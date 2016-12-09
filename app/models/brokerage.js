import DS from 'ember-data';

export default DS.Model.extend({
    website: DS.attr('string'),
    image: DS.attr('string'),
    name: DS.attr('string'),
    phone: DS.attr('string'),
    address: DS.belongsTo('address')
});
