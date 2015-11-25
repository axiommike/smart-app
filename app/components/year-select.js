import Ember from "ember";

export default Ember.Component.extend({
	start: 1950,
	end: new Date().getFullYear(),
	years: Ember.computed("start", "end", function() {
		let result = [];
		for (let i = this.get("start"); i <= this.get("end"); i++) {
			result.push(i);
		}
		return result;
	}),
	value: null,
	required: false,
	prompt: null,
	title: null
});
