import Ember from "ember";

export default Ember.Component.extend({
    optionValuePath: null,
    optionLabelPath: null,
    content: null,
    prompt: null,
    required: null,
    value: null,
    actions: {
        selectOne(value) {
            this.sendAction('change', value);
        }
    },
    didRender() {
        var value = this.get('value');
        if (value) {
            this.$().find('option[value="' + value + '"]').attr('selected', 'selected');
        }
    }
});
