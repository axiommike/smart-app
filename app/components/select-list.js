import Ember from "ember";

export default Ember.Component.extend({
    optionValuePath: null,
    optionLabelPath: null,
    content: null,
    prompt: null,
    actions: {
        selectOne(value) {
            this.sendAction('change', value);
        }
    }
});