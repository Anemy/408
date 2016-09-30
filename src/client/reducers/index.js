// TODO: As the number of reducers increases, we should move them into separate
// files and then combine the reducres here.
const initialState = {
  isPlaying: false,
  test: 'example',
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

module.exports = Reducers;
