// const SocketConnection = require('./socket');
//
// function fetchPosts(subreddit) {
//   return dispatch => {
//     dispatch(requestPosts(subreddit))
//     return fetch(`http://www.reddit.com/r/${subreddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(subreddit, json)))
//   }
// }


const Actions = {
  test: function(input) {
    console.log(input);
    return {
      type: 'TEST',
      input,
    };
  },
};

module.exports = Actions;
