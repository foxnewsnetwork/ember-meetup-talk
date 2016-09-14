// movie-edit-container
import Ember from 'ember';
import connect from 'ember-redux/components/connect';

// movie-edit
function statesToCompute(state) {
  return {
    movie: state.movies.active
  }
}
function actionsToDispatch(dispatch) {
  return {
    movieNameChanged(name) {
      dispatch({
        type: 'ACTIVE_MOVIE_NAME_CHANGED',
        name
      })
    }
  }
}
export default connect(statesToCompute, actionsToDispatch)(Ember.Component.extend({
  routing: service('-routing'),
  currentRouteName: readOnly('routing.currentRouteName')
}));

// movie
function statesToCompute(state) {
  return {
    movie: state.movies.active
  }
}
export default connect(statesToCompute)(Ember.Component.extend({}));

// movies index
function statesToCompute(state) {
  return {
    movie: state.movies
  }
}
export default connect(statesToCompute)(Ember.Component.extend({}));

// admin movie
function statesToCompute(state) {
  return {
    movie: state.movies.adminActive
  }
}
export default connect(statesToCompute)(Ember.Component.extend({}));


if (isPresent(fooBar)) {
  this.set('foobar', 3);
  return this.doAsyncThing(foo, bar);;
}

return RSVP.resolve();


Ember.Object.create({
  killSelf: Ember.observer('appWorks', function() {
    if (this.get('appWorks')) {
      return;
    }
    this.get('willKillSelf', true);
    this.sendAction('action', this);
  })
})

$('blah').on('some-event', (event) => {
  this.send('someEvent', event)
})

