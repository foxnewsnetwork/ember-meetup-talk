import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('movies');
  this.route('movie/:movie_id');
  this.route('admin', { path: 'admin' }, function() {
    this.route('movie/:movie_id', { path: 'movie' }, function() {
      this.route('edit');
    })
  })
});

export default Router;
