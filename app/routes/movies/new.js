import Ember from 'ember';
import route from 'ember-redux/route';
import { afterSuccess } from 'ember-with-redux/utils/changeset-hooks';

function model(dispatch) {
  const changeset = this.store.checkoutChangeset({ modelName: 'movie' });
  return afterSuccess(dispatch, changeset, (changeset) => {
    return this.transitionTo('movie', changeset.id);
  });
}

export route({model})(Ember.Route.extend());

function model() {
  return this.store.createRecord('movie');
}

export Ember.Controller.extend({
  actions: {
    saveRecord() {
      this.get('model').save().then((movie) => {
        return this.transititonToRoute('movie', movie.id);
      });
    }
  }
})
