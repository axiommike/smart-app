import DS from 'ember-data';

export default DS.Model.extend({
    image: DS.attr('string'),
    email: DS.attr('string'),
    website: DS.attr('string'),
    full_name: DS.attr('string'),
    home_phone: DS.attr('string'),
    cell_phone: DS.attr('string'),
    work_phone: DS.attr('string'),
    brokerage_id: DS.attr('string'),
    brokerage: DS.belongsTo('brokerage')
});
