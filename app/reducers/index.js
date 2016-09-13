import ds from 'ember-with-redux/reducers/ds';
export default { ds };

// reducers.js
export function reducer(state, action) {
  switch (action.type) {
    case 'DESERIALIZE_MOVIE':
      // code omitted
    case 'ACTIVE_MOVIE_NAME_CHANGED':
      // CODE omitted
    ...
  }
}
