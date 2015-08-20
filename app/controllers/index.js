import Ember from "ember";

export default Ember.Controller.extend({
	agent: null,
	cid: null, /* client ID -- named cid because of legacy reasons */
	brokerage: null,
	queryParams: ["agent", "cid", "brokerage"]
});
