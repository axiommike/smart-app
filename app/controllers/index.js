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
    agents: null,
    init() {
        this.store.findAll('agent').then((agents) => {
            this.set('agents', agents);
        });
    },
    actions: {
        sendIncomplete: function () {
            this.get('model').save().then((applicant) => {
                this.transitionToRoute('thank-you', {queryParams: {id : applicant.get('id'), is_incomplete: true}});
            });
        },
        nextStep: function () {
            let applicant = this.get('model');
            let mortgage = this.store.createRecord('mortgage', {
                'applicants': [applicant]
            });
            if (applicant.get('agent_id')) {
                mortgage.set('agent_id', applicant.get('agent_id'));
            } else {
                let agent = applicant.get('agent');
                let brokerage = agent.get('brokerage');
                mortgage.set('agent_id', agent.get('id'));
                mortgage.set('agent_id', brokerage.get('id'));
            }

            mortgage.save().then((mortgage) => {
                this.transitionToRoute('applicants', {queryParams: {id : mortgage.get('id')}});
            });
        },
        changeSource: function (value) {
            this.set("model.referral_source", value);
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
            this.set("model.type", value);
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
            this.set("model.down_payment_source", value);
            switch (value) {
                case "other":
                    this.set("isOtherDownPaymentSource", true);
                    break;
                default:
                    this.set("isOtherDownPaymentSource", false);
                    break;
            }
        },
        changeAgent: function (value) {
            this.set("model.agent_id", value);
        }
    },
    isFriend: false,
    isReferral: false,
    isOther: false,
    isPurchase: false,
    isOtherDownPaymentSource: false
});
