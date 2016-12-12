import Ember from "ember";

export default Ember.Component.extend({
    vehicles: Ember.A(),
    classNameBindings: ["vehicles.length:has-vehicles", ":vehicle-table"],
    onRemove: null,
    onAdd: null,
    actions: {
        addVehicle: function() {
            this.sendAction("onAdd");
        },
        removeVehicle: function(vehicle) {
            this.sendAction("onRemove", vehicle);
        }
    }
});
