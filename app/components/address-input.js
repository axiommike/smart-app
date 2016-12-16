import Ember from 'ember';
const { TextField } = Ember;

export default TextField.extend({
  classNameBindings: ['googlePlace:autocompleted', ':address-input'],
  placeholder: 'Address',
  title: 'Please provide a valid address',
  listener: null,
  didInsertElement() {
    let autocomplete = new google.maps.places.Autocomplete(
            this.$()[0], {
              types: ['geocode']
            }
        );
    let listener = google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.sendAction('change', autocomplete.getPlace());
    });
    this.setProperties({
      listener
    });
  },
  willDestroy() {
    google.maps.event.removeListener(this.get('listener'));
  }
});
