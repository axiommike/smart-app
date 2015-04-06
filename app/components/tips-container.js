import Ember from "ember";

export default Ember.Component.extend({
	didInsertElement: function() {
		if (this.get("hasTips") && this.get("model")) {
			this.get("tips").forEach((tip) => {
				if (tip["property"] && tip["tooltip"]) {
					let model = this.get("model"), target;
					if (target = model.get(`${model}.${tip.property}`)) {
						model.addObserver(target, this, "toggleChanged");
					}
				}
				else {
					throw new EmberError(`Missing property or tooltip on object ${tip}`, tip);
				}
			});
		}
	},
	tagName: "tips-container",
	model: null,
	tips: Ember.A(),
	tipsCount: Ember.computed.alias("tips.length"),
	hasTips: Ember.computed.notEmpty("tips"),
	classNameBindings: [":tips-container", "hasTips"],
	enabledTips: Ember.computed.filterBy("tips.changed", true),
	lastChangedTip: Ember.computed.any("currentTip"),
	actions: {
		toggleChanged: function(tip) {
			tip.toggleProperty("changed");
		}

	}
});
