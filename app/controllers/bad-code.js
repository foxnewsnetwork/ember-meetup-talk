import Ember from 'ember';
export default Ember.Controller.extend({
  isDialogVisible: false,
  isUserLoggedIn: false,
  userHasFoo: false,
  dialogBarCount: 0,
  userSessionController: inject.controller('user-session'),
  streamSession: inject.service('stream-session'),
  routeCtx: null,
  didRenderDialogContainer: false,
  checkDialogContainerRender: Ember.observer('userSessionController.userLoggedIn', function() {
    this.send('refresh');
    this.set('didRenderDialogContainer', Ember.$('.dialog-container').length > 0);
  }),
  showDialog(dialog) {
    // omitted
  },
  actions: {
    showDialog(dialog) {
      if (this.get('isDialogVisible') && this.get('didRenderDialogContainer')) {
        this.incrementProperty('dialogBarCount');
        if (this.get('userHasFoo')) {
          let routeCtx = this.get('routeCtx');
          if (Ember.isBlank(routeCtx)) {
            routeCtx = this;
            this.get('userSessionController').set('routeCtx', routeCtx);
          }
          this.showDialog(dialog, routeCtx);
        } else if (!this.get('isUserLoggedIn')) {
          this.showDialog(dialog, this.get('userSessionController'), false);
        }
      } else {
        this.set('isDialogVisible', true);
        this.get('streamSession').send('showDialog', dialog);
      }
    }
  }
})
