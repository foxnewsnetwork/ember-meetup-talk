import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  showcaseProducts: hasMany('showcase-product')
});
