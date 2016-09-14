import DS from 'ember-data';
// user
export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  sessions: DS.hasMany('session')
});
