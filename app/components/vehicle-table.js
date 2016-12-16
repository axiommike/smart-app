import Ember from 'ember';
const { A, Component } = Ember;

export default Component.extend({
  vehicles: A(),
  classNameBindings: ['vehicles.length:has-vehicles', ':vehicle-table'],
  onRemove: null,
  onAdd: null,
  actions: {
    addVehicle() {
      this.sendAction('onAdd');
    },
    removeVehicle(vehicle) {
      this.sendAction('onRemove', vehicle);
    }
  }
});
