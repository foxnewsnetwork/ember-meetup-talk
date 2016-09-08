import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  tileImage: DS.attr('string'),
  backgroundImage: DS.attr('string'),
  heroImage: DS.attr('string'),
  categories: DS.hasMany('category')
});
