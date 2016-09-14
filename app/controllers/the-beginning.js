import Ember from 'ember';

export default Ember.Controller.extend({
  isDialogVisible: false,

  actions: {
    toggleDialog() {
      this.set('isDialogVisible', !this.get('isDialogVisible'));
    }
  }
});


// new movie component
export default Ember.Component.extend({
  actions: {
    persistMovie(changeset) {
      const thunk = this.store.persistChangeset(changeset);
      this.redux.dispatch(thunk).then((changeset) => {
        this.transitionToRoute('somewhere', changeset.id)
      });
    }
  }
})
