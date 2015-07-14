import Ember from "ember";

export default Ember.Controller.extend({
	agentID: null,
	cid: null, /* client ID -- named cid because of legacy reasons */
	brokerage: null,
	queryParams: ["agentID", "cid", "brokerage"]
});
