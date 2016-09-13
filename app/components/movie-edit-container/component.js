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
