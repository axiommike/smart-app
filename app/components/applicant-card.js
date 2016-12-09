import Ember from "ember";

export default Ember.Component.extend({
    store: Ember.inject.service(),
    tagName: "applicant-card",
    classNameBindings: ["is_primary:primary-applicant:co-applicant", ":applicant-card", "onRemoveApplicant:removable"],
    youngestApplicantAge: `${new Date().getFullYear() - 18}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + (new Date().getDate())).slice(-2)}`,
    maritalStatusOptions: [
        {value: "single", label: "Single"},
        {value: "married", label: "Married"},
        {value: "widowed", label: "Widowed"},
        {value: "separated", label: "Separated"},
        {value: "divorced", label: "Divorced"},
        {value: "common-law", label: "Common-law"},
        {value: "other", label: "Other"}
    ],
    relationshipTypes: [
        {value: "spouse", label: "Spouse"},
        {value: "common-law", label: "Common-Law"},
        {value: "related", label: "Related Family Member"},
        {value: "parent", label: "Parent"},
        {value: "sibling", label: "Sibling"},
        {value: "child", label: "Child"},
        {value: "grandchild", label: "Grandchild"},
        {value: "grandparent", label: "Grandparent"},
        {value: "other", label: "Other"}
    ],
    applicant: null,
    is_primary: false,
    is_editable: false,
    is_editing: false,
    actions: {
        changeMaritalStatus: function (value) {
            this.set("applicant.marital_status", value);
        },
        changeRelationship: function (value) {
            this.set("applicant.relationship", value);
        },
        removeApplicant() {
            let value = this.get('applicant');
            this.sendAction("removeApplicant", value);
        }
    }
});
