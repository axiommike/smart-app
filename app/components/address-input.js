import Ember from "ember";

export default Ember.TextField.extend({
	address: null, /* Ember data model for address */
	googlePlace: null, /* Google's place object once one is selected */
	autocomplete: null,
	addressFormats: {
		street_number: {
			format: "long_name",
			modelKey: "unit"
		},
		route: {
			format: "long_name",
			modelKey: "street"
		},
		locality: {
			format: "long_name",
			modelKey: "city"
		},
		administrative_area_level_1: {
			format: "short_name",
			modelKey: "province"
		},
		country: {
			format: "short_name",
			modelKey: "country"
		},
		postal_code: {
			format: "long_name",
			modelKey: "postalCode"
		}
	},
	resolveWith: function() {
		this.sendAction("initialize");
	},
	placeSelected: function() {
		console.log("selected location");
		this.$().trigger("change"); // hack for values not updating
		let place = this.get("autocomplete").getPlace();
		console.dir(place);
		this.set("googlePlace", place);
		let addressComponents = place.address_components,
			address = {};
		for (let i = 0; i < addressComponents.length; i++) {
			let addressType = addressComponents[i].types[0];
			if (this.get("addressFormats")[addressType]) {
				let userMap = this.get("addressFormats")[addressType],
					friendlyKey = userMap.modelKey,
					format = userMap.format;
				address[friendlyKey] = addressComponents[i][format];
			}
		}
		if (this.get("address")) {
			console.log("about to set the properties of address to:");
			console.dir(address);
			this.setProperties("address", address);
		}
		else {
			console.warn("No address provided.  Please provide one!");
		}
	},
	actions: {
		initialize: function() {
			console.log("resolveWith fired");
			let autocomplete = new google.maps.places.Autocomplete(
				this.$()[0], {
					types: ["geocode"]
				}
			);
			google.maps.event.addListener(autocomplete, "place_changed", function() {
				console.log("selected location");
				console.dir(autocomplete.getPlace);
			})
		}
	},
	/**
	 * Initialize the Google Maps API autocomplete on the input
	 */
	didInsertElement: function() {
		console.log("didInsertElement fired");
		let src = "//maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places";
		var promise;
		return promise = new Ember.RSVP.Promise((resolve, reject) => {
			window.__emberGoogleMapLoaded__ = Ember.run.bind(() => {
				promise = null;
				window.__emberGoogleMapLoaded__ = null;
				console.dir(this);
				let autocomplete = new google.maps.places.Autocomplete(
					this.$()[0], {
						types: ["geocode"]
					}
				);
				this.set("autocomplete", autocomplete);
				google.maps.event.addListener(autocomplete, "place_changed", () => {
					this.placeSelected();
				});
				resolve(this.get("resolveWith"));
			});
			Ember.$.getScript(src + "&callback=__emberGoogleMapLoaded__").fail(function (jqXhr) {
				promise = null;
				window.__emberGoogleMapLoaded__ = null;
				reject(jqXhr);
			});
		});
	}
});
