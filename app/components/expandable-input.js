import Ember from "ember";

export default Ember.TextField.extend({
    type: "text",
    defaultSize: 20,
    size: Ember.computed("value", function() {
        return this.get("value.length") > 0 ? this.get("value.length") + 1 : this.get("defaultSize");
    })
});
