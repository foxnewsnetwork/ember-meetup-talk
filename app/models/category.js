import DS from 'ember-data';
// category
export default DS.Model.extend({
  title: DS.attr('string'),
  products: DS.hasMany('showcase-product')
});
