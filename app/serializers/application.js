import DS from "ember-data";

import LFAdapter from "ember-localforage-adapter/adapters/localforage";

export default LFAdapter.extend({
	namespace: "axiom-application-prototype"
});
