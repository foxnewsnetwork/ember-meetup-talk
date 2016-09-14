import DS from 'ember-data';
// Movie
export default DS.Model.extend({
  title: DS.attr('string'),
  duration: DS.attr('moment'),
  rating: DS.attr('number'),
  releasedAt: DS.attr('moment')
});
