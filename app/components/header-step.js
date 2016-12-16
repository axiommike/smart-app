import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  step: null,
  totalSteps: null,
  stepName: null,
  showSubmitButton: false,
  showBreadcrumbs: false,
  agent: null,
  brokerage: null,
  previousStep: null,
  steps: [
    {
      hidden: false,
      url: '/',
      title: 'Basic Information'
    },
    {
      hidden: false,
      url: 'applicants',
      title: 'Applicants'
    },
    {
      hidden: false,
      url: 'assets',
      title: 'Assets'
    },
    {
      hidden: false,
      url: 'liabilities',
      title: 'Liabilities'
    },
    {
      hidden: false,
      url: 'summary',
      title: 'Summary'
    }
  ]
});
