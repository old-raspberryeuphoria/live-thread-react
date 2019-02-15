import React, { Component } from 'react';
import './App.scss';
import PostsContainer from './ui/containers/PostsContainer/PostsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span class="App-logo">LT</span>
          <span class="App-title">LiveThread</span>
        </header>
        <main>
          <PostsContainer />
        </main>
      </div>
    );
  }
}

export default App;
