import Ember from "ember";

export default Ember.Component.extend({
    employment: null,
    employmentTypes: [
        {label: "Full-Time", value: "full-time"},
        {label: "Part-Time", value: "part-time"},
        {label: "Self-Employed", value: "self-employed"},
        {label: "Pension", value: "pension"},
        {label: "Retired", value: "retired"},
        {label: "Other", value: "other"}
    ],
    businessTypes: [
        {label: "Incorporated", value: "incorporated"},
        {label: "Partnership", value: "partnership"},
        {label: "Sole Proprietorship", value: "sole propriety"}
    ],
    paymentFrequencies: [
        {label: "Hourly", value: "hourly"},
        {label: "Salary", value: "salary"},
        {label: "Commission", value: "commission"},
        {label: "Commission + Salary", value: "salary_commissions"},
        {label: "Commission + Hourly", value: "hourly_commissions"}
    ],
    noaYears: 2,
    noaValues: Ember.computed("noaYears", function() {
        let noas = Ember.A(),
            lastYear = new Date().getFullYear() - 1;
        for (let year = 0; year < this.get("noaYears"); year++) {
            noas.pushObject({year: lastYear - year, value: null});
        }
        return noas;
    }),
    removable: false,
    actions: {
        changeType(value) {
            this.set("employment.type", value);
            switch (value) {
                case "self-employed":
                    this.set("showCompensation", true);
                    this.set("showAnnualPay", false);
                    this.set("showLine150", true);
                    this.set("showPosition", true);
                    this.set("showBusinessType", true);
                    break;
                case "pension":
                    this.set("showCompensation", false);
                    this.set("showAnnualPay", true);
                    this.set("showLine150", false);
                    this.set("showPosition", false);
                    this.set("showBusinessType", false);
                    break;
                case "retired":
                    this.set("showCompensation", false);
                    this.set("showAnnualPay", false);
                    this.set("showLine150", false);
                    this.set("showPosition", false);
                    this.set("showBusinessType", false);
                    break;
                default:
                    this.set("showCompensation", true);
                    this.set("showAnnualPay", true);
                    this.set("showLine150", false);
                    this.set("showPosition", true);
                    this.set("showBusinessType", false);
                    break;
            }
        },
        changePaymentFrequency(value) {
            this.set("employment.payment_frequency", value);
            switch (value) {
                case "hourly":
                    this.set("isHourly", true);
                    break;
                default:
                    this.set("isHourly", false);
            }
        },
        changeBusinessType(value) {
            this.set("employment.business_type", value);
        },
        changeAddress: function (params) {
            let address = this.get('employment');
            address.set('url', params.url);
            for (let i=0; i< params.address_components.length; i++) {
                let obj = params.address_components[i];
                switch(obj.types[0]) {
                    case 'locality':
                        address.set('city', obj.long_name);
                        break;
                    case 'administrative_area_level_1':
                        address.set('province', obj.short_name);
                        break;
                    case 'country':
                        address.set('country', obj.short_name);
                        break;
                    case 'postalCode':
                        address.set('postal_code', obj.long_name);
                        break;
                }
            }
        },
        remove() {
            let value = this.get('employment');
            this.sendAction('removeEmployment', value);
        }
    },
    showPosition: true,
    showCompensation: true,
    showLine150: false,
    showBusinessType: false,
    showAnnualPay: true,
    isHourly: true
});
