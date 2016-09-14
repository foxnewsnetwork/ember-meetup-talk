import Ember from 'ember';

function byReviewRating(movieA, movieB) {
  return movie.get('data').review > movie.get('data').review;
}
function pg13(movie) {
  return movie.get('data').rating === 'pg-13';
}
function pg13MoviesOrderByRating(movies) {
  return movies.filter(pg13).sort(byReviewRating)
}
export default Ember.Route.extend({
  queryParams: {
    foo: {
      refreshModel: true
    },
    bar: {
      refreshModel: false
    }
  },
  model() {
    return this.findAll('movie');
  },

  model() {
    return this.query('movie', { rating: 'pg-13'}, pg13MoviesOrderByRating);
  }

  actions: {
    loading() {
      // do something
    },
    error() {
      // show error
    }
  }
})


