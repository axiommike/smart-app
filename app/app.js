import Ember from "ember";
import Resolver from "ember/resolver";
import loadInitializers from "ember/load-initializers";
import config from "./config/environment";
import ValadatableInput from "ember-cli-html5-validation/mixins/validatable-input";
import SelectList from "ember-select-list/components/select-list";

SelectList.reopen(ValadatableInput);

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
