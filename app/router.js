import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('/', { path: '/index'});
  this.route('applicants', { path: '/applicants'});
  this.route('assets', { path: '/assets'});
  this.route('liabilities', { path: '/liabilities'});
  this.route('summary', { path: '/summary'});
  this.route('thank-you', { path: '/thank-you'});
});

export default Router;
