import Ember from 'ember';
export default Ember.Controller.extend({
  _privateVarDontTouch: false
});

export default Ember.Controller.extend({
  modifyPrivateVar(value) {
    this.set('_privateVarDontTouch', value);
  }
});
