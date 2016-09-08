import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  username() {
    return faker.internet.userName();
  },
  email() {
    return faker.internet.email();
  }
});
