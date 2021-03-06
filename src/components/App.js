import React from 'react';
import { Route } from 'react-router';
import Home from './Home';
import PostDetail from './PostDetail';
import PostList from './PostList';

/**
 * @description Contains the app core functionality.
 * @constructor
 * @extends React.Component
 */
const App = (props) => {
  return (
    <div className="App">
      <Home>
        <Route exact path="/" component={PostList} />
        <Route exact path="/:category" component={PostList} />
        <Route exact path="/:category/:postId" component={PostDetail} />
      </Home>
    </div>
  )
}

export default App;
