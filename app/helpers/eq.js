import Ember from 'ember';
const { Helper } = Ember;

export default Helper.helper(function(params) {
  return params[0] === params[1];
});
