import Ember from 'ember';
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

  actions: {
    loading() {
      // do something
    },
    error() {
      // show error
    }
  }
})
