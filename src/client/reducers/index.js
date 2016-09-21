// TODO: As the number of reducers increases, we should move them into separate
// files and then combine the reducres here.
const Reducers = (state = {}, action) => {
  switch (action.type) {
  case 'TEST':
    console.log('sanity');
    return {
      poop: action.poop,
    };
  }
  return state;
};

module.exports = Reducers;
