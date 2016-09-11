import Ember from 'ember';

export default Ember.Controller.extend({
  isDialogVisible: false,

  actions: {
    toggleDialog() {
      this.set('isDialogVisible', !this.get('isDialogVisible'));
    }
  }
});
