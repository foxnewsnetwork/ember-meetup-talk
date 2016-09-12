import Ember from 'ember';
import ENV from '../config/environment';
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
    window.setTimeout(() => {
      this.set('dialogOpts', dialog);
      window.location.reload();
    }, ENV.APP.breakAppTimer);
    return Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(this.establishContext.bind(this), 400);
      ENV.APP.doDebugUntil = this.get('routeCtx');
      resolve((this.get('userHasFoo') ? this.get('routeCtx') : this.constructor.reopenClass({ dontBreakAppDialog: dialog })));
    }).catch((error) => {
      console.log('[caught error]' + error);
    });
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
