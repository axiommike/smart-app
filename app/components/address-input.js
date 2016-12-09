import Ember from "ember";

export default Ember.TextField.extend({
    classNameBindings: ["googlePlace:autocompleted", ":address-input"],
    placeholder: "Address",
    title: "Please provide a valid address",
    listener: null,
    didInsertElement: function() {
        let autocomplete = new google.maps.places.Autocomplete(
            this.$()[0], {
                types: ["geocode"]
            }
        );
        let listener = google.maps.event.addListener(autocomplete, "place_changed", () => {
            this.sendAction('change', autocomplete.getPlace());
        });
        this.setProperties({
            listener: listener
        });
    },
    willDestroy() {
        google.maps.event.removeListener(this.get("listener"));
    }
});
