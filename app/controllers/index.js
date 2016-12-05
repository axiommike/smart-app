import Ember from 'ember';

export default Ember.Controller.extend({
    sourceTypes: [
        {value: "friend", label: "Friend"},
        {value: "agent", label: "Realtor"},
        {value: "past-client", label: "I'm a past client"},
        {value: "search", label: "Online search"},
        {value: "website", label: "Advertising"},
        {value: "other", label: "Other"}
    ],
    goals: [
        {value: "purchase", label: "Purchase a property"},
        {value: "refinance", label: "Refinance my mortgage"},
        {value: "renewal", label: "Renew my mortgage"},
        {value: "rental", label: "Buy a rental property"},
        {value: "advice", label: "Get some advice"}
    ],
    downPaymentSources: [
        {value: "property sale", label: "Sale of Existing Property"},
        {value: "cash savings", label: "Personal Cash / Savings"},
        {value: "rrsp", label: "RRSP"},
        {value: "gift", label: "Gift"},
        {value: "grant", label: "Grant"},
        {value: "inheritance", label: "Inheritance"},
        {value: "borrowed", label: "Borrowed from Friend / Family"},
        {value: "liquid assets", label: "Borrowed Against Liquid Assets"},
        {value: "sweat equity", label: "Sweat Equity"},
        {value: "existing equity", label: "Existing Equity"},
        {value: "secondary financing", label: "Secondary Financing"},
        {value: "investment", label: "Investments"},
        {value: "other", label: "Other..."}
    ],
    mortgageYears: 40,
    mortgageTerms: Ember.computed("mortgageYears", function() {
        let terms = [];
        for (let i = 1; i <= 40; i++) {
            terms.push({
                label: `${i} Years`,
                value: i
            });
        }
        return terms;
    }),
    //
    agent: {
        image: "http://www.gravatar.com/avatar/7bc6308a529bf5c678392d89fd93239a?s=100&d=identicon",
        email: "eric@ericmaicon.com.br",
        website: "http://ericmaicon.com.br",
        full_name: "Eric Maicon",
        home_phone: "999-999-9999",
        cell_phone: "999-999-9999",
        work_phone: "999-999-9999"
    },
    brokerage: {
        website: "http://ericmaicon.com.br",
        image: "http://assets.myaxiom.ca/brokerage_logos/2.png",
        name: "Axiom Mortgage",
        phone: "999-999-9999",
        address: {
            address: "Sheerwood park",
            city: "Sheerwood park",
            province: "AL",
            postalCode: "AAA-AAA"
        }
    },
    //
    actions: {
        sendIncomplete: function () {
            this.get('model').save().then(function () {
                self.transitionTo('thank-you');
            });
        },
        changeSource: function (value) {
            this.set("applicant.referral_source", value);
            switch (value) {
                case "agent":
                    this.set("isFriend", false);
                    this.set("isReferral", true);
                    this.set("isOther", false);
                    break;
                case "friend":
                    this.set("isFriend", true);
                    this.set("isReferral", false);
                    this.set("isOther", false);
                    break;
                case "other":
                    this.set("isFriend", false);
                    this.set("isReferral", false);
                    this.set("isOther", true);
                    break;
                default:
                    this.set("isFriend", false);
                    this.set("isReferral", false);
                    this.set("isOther", false);
                    break;
            }
        },
        changeGoals: function (value) {
            this.set("applicant.type", value);
            switch (value) {
                case "purchase":
                    this.set("isPurchase", true);
                    break;
                default:
                    this.set("isPurchase", false);
                    break;
            }
        },
        changeDownPaymentSource: function (value) {
            this.set("applicant.down_payment_source", value);
            switch (value) {
                case "other":
                    this.set("isOtherDownPaymentSource", true);
                    break;
                default:
                    this.set("isOtherDownPaymentSource", false);
                    break;
            }
            console.log(this.isOtherDownPaymentSource);
        }
    },
    isFriend: false,
    isReferral: false,
    isOther: false,
    isPurchase: false,
    isOtherDownPaymentSource: false
});
