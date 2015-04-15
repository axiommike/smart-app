import Ember from "ember";

export default Ember.Component.extend({
	tagName: "asset",
	classNameBindings: [":asset", "asset.type"],
	asset: null,
	assetTypes: [
		{value: "item", label: "Personal Item"},
		{value: "savings", label: "Savings Account"}, /* Chequing, savings accounts */
		{value: "gic", label: "GIC, Term Deposit"},
		{value: "resp", label: "RESP (Registered Educational Savings Plan)"},
		{value: "investment", label: "Stocks/Bonds Investment"},
		{value: "rrsp", label: "RRSP"},
		{value: "vehicle", label: "Vehicle"},
		{value: "property", label: "Property"},
		{value: "other", label: "Other"}
	],
	savingsTypes: [
		{value: "savings", label: "Savings Account"},
		{value: "chequing", label: "Chequing Account"},
		{value: "other", label: "Other"}
	],
	vehicleMakes: [
		"Acura",
		"Alfa Romeo",
		"Aston Martin",
		"Audi",
		"Bentley Motors",
		"BMW",
		"Buick",
		"Cadillac",
		"Chevrolet",
		"Chrysler",
		"Dodge",
		"Ferrari",
		"Fiat",
		"Ford",
		"Geely",
		"GM - General Motors",
		"GMC",
		"Honda",
		"Hummer",
		"Hyundai",
		"Infiniti",
		"Isuzu",
		"Jaguar",
		"Jeep",
		"Kia",
		"Laforza",
		"Lamborghini",
		"Lancia",
		"Land Rover",
		"Lexus",
		"Lincoln",
		"Lotus",
		"Maserati",
		"Mazda",
		"Mercedes-Benz",
		"Mercury",
		"MINI",
		"Mitsubishi",
		"Nissan",
		"Oldsmobile",
		"Peugeot",
		"Pontiac",
		"Porsche",
		"Renault",
		"Rolls-Royce",
		"Saab",
		"Saturn",
		"Scion",
		"Subaru",
		"Suzuki",
		"Tesla Motors",
		"Toyota",
		"Volkswagen",
		"Volvo"
	],
	vehicleMake: null,
	vehicleModel: null,
	vehicleYear: null,
	vehicleInfoChanged: function() {
		if (this.get("vehicleYear") && !Ember.isBlank(this.get("vehicleMake")) && this.get("asset")) {
			let vehicleModel = !Ember.isBlank(this.get("vehicleModel")) ? `${this.get("vehicleModel")} ` : "";
			this.set("asset.description", `${this.get("vehicleMake")} ${vehicleModel}- ${this.get("vehicleYear")}`);
		}
	}.observes("vehicleMake", "vehicleYear", "vehicleModel")
});
