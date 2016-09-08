import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  categories: hasMany('category'),
  session: belongsTo('session')
});
