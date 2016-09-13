import { test } from 'qunit';
import moduleForAcceptance from 'gnatflix/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | see a movie');

test('visiting /movie/1/edit', function(assert) {
  visit('/movie/1/edit');

  andThen(function() {
    fillIn('input[name=name]', 'new-name');
    click('submit');
  });

  andThen(function() {
    assert.ok(movieHasChanged());
  });
});
