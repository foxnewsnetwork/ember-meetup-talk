import Ember from 'ember';
// Ember.Route by default findRecord(model, model_id) for you
export default Ember.Route.extend({});

// movie route
function loadMovie(id) {
  return (dispatch) => {
    return Ember.$.ajax(`/api/movies/${id}`, 'GET').then( (response) => {
      dispatch({type: 'DESEARIALIZE_MOVIE', response})
    });
  }
}
export const MovieRoute = route({
  model: (dispatch, id) => dispatch(loadMovie(id))
})(Ember.Route.extend());
