import DS from 'ember-data';
// streaming-product
export default DS.Model.extend({
  title: DS.attr('string'),
  videoLink: DS.attr('string'),
  session: DS.belongsTo('session')
});
