import Ember from "ember";
import ajax from "ic-ajax";

export default Ember.Controller.extend({
	steps:       [
		"Basic Information",
		"Applicants",
		"Assets",
		"Liabilities",
		"Summary",
		"Thank You"
	],
	isDefault: Ember.computed.equal("model.brokerage", 2),
	agent: null,
	cid: null, /* client ID -- named cid because of legacy reasons */
	queryParams: ["agent", "cid", "brokerage"],
	currentStep: 0,
	realStep:    Ember.computed("currentStep", function () {
		return this.get("currentStep") + 1;
	}),
	lenders:     [
		"Alberta Treasury Branch (ATB)",
		"Assiniboine Credit Union",
		"B2B (Formerly Laurentian Bank)",
		"Bridgewater Bank",
		"Canadiana Financial",
		"CFF BANK",
		"CMLS Financial",
		"Coast Capital Savings",
		"Credit Union Atlantic",
		"Envision Financial",
		"Equitable Trust",
		"First National Financial LP",
		"G and F Financial",
		"Home Trust",
		"ICICI",
		"MCAP",
		"Merix Financial",
		"National Bank of Canada",
		"Optimum mortgage",
		"Radius Financial",
		"RMG",
		"Scotia Mortgage Authority",
		"Servus Credit Union",
		"Street Capital",
		"TD Canada Trust",
		"Van City"
	],
	banks:       [
		"B2B Bank",
		"Bank of Montreal",
		"Bank of Nova Scotia",
		"Bridgewater Bank",
		"Canadian Imperial Bank of Commerce",
		"Canadian Tire Bank",
		"Canadian Western Bank",
		"CFF Bank",
		"Citizens Bank of Canada",
		"Continental Bank of Canada",
		"CS Alterna Bank",
		"DirectCash Bank",
		"Equitable Bank",
		"First Nations Bank of Canada",
		"General Bank of Canada",
		"Hollis Canadian Bank",
		"HomEquity Bank",
		"Laurentian Bank of Canada",
		"Manulife Bank of Canada",
		"National Bank of Canada",
		"Pacific & Western Bank of Canada",
		"President's Choice Bank",
		"RedBrick Bank",
		"Rogers Bank",
		"RBC Royal Bank",
		"Tangerine Bank",
		"Toronto-Dominion Bank",
		"Zag Bank",
		"Amex Bank of Canada",
		"Bank of America (Canada)",
		"BofA Canada Bank",
		"Bank Of China (Canada)",
		"Bank of Tokyo - Mitsubishi UFJ (Canada) ",
		"Bank One Canada",
		"BNP Paribas (Canada)",
		"Citco Bank Canada",
		"Citibank Canada",
		"CTC Bank of Canada",
		"Habib Canadian Bank",
		"HSBC Bank Canada",
		"ICICI Bank Canada",
		"Industrial and Commercial Bank of China (Canada)",
		"JPMorgan Chase Bank",
		"J.P. Morgan Canada",
		"Korea Exchange Bank of Canada",
		"Mega International Commercial Bank (Canada)",
		"Shinhan Bank Canada",
		"Société Générale (Canada) ",
		"State Bank Of India (Canada)",
		"Sumitomo Mitsui Banking Corporation Of Canada (Japan)",
		"UBS Bank (Canada) ",
		"Walmart Canada Bank",
		"Bank Of America, N.A. (Canada Branch)",
		"The Bank of New York Mellon ",
		"Barclays Bank PLC, Canada Branch",
		"Capital One Bank (Canada Branch)",
		"Citibank, N.A.",
		"Comerica Bank",
		"Deutsche Bank A.G.",
		"Dexia Credit Local S.A.",
		"HSBC Bank USA N.A.",
		"JPMorgan Chase Bank N.A.",
		"Maple Bank GmbH",
		"Mizuho Bank, Ltd., Canada Branch",
		"M&T Bank",
		"Northern Trust Company (Canada Branch)",
		"PNC Bank Canada Branch",
		"Rabobank Nederland, (Canada Branch)",
		"Société Générale (Canada Branch)",
		"The Royal Bank of Scotland plc, Canada Branch",
		"State Street Bank And Trust Company",
		"United Overseas Bank Limited",
		"UBS AG (Canada Branch)",
		"Wells Fargo Bank, N.A., Canadian Branch",
		"Allied Irish Banks, p.l.c.",
		"Credit Suisse, Toronto Branch",
		"Merrill Lynch International Bank Limited",
		"Union Bank of California, N.A.",
		"U.S. Bank N.A.",
		"First Commercial Bank",
		"Fifth Third Bank",
		"Scotiabank",
		"TD Canada Trust"
	],
	actions: {
		sendIncomplete: function () {
			let incompleteApplication = this.get("model"),
				applicant = incompleteApplication.get("applicant");
			incompleteApplication.set("isIncomplete", true);
			if (applicant.get("assets.length")) {
				this.send("saveAssets");
			}
			if (applicant.get("income.length")) {
				this.send("saveIncome");
			}
			if (applicant.get("properties.length")) {
				this.send("saveProperties", this.get("model.applicant.properties"));
			}
			if (applicant.get("vehicles.length")) {
				this.send("saveVehicles", this.get("model.applicant.vehicles"));
			}
			Ember.RSVP.all([applicant.save(), incompleteApplication.save()]).then(([applicant, application]) => {
				this.transitionToRoute("mortgage-application.thank-you", application);
			});
		}
	}
});
