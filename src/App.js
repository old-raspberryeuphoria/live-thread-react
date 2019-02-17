import React, { Component } from 'react';
import './App.scss';
import PostsListContainer from './ui/containers/PostsListContainer/PostsListContainer';
import PostPageContainer from './ui/containers/PostPageContainer/PostPageContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRoute: this.getRouteFromUrl(),
    };
  }

  getRouteFromUrl = () => {
    const currentRoute = {};

    const url = new URL(window.location.href);
    const postId = url.searchParams.get('postId');

    if (postId) {
      currentRoute.name = 'viewpost';
      currentRoute.postId = postId;
    } else {
      currentRoute.name = 'home';
    }

    return currentRoute;
  }

  updateRoute = ({ newRoute }) => {
    this.setState({ currentRoute: newRoute });
  }

  onTitleClick = e => {
    e.preventDefault();

    const newRoute = {
      name: 'home',
    };
    
    const stateObj = {};
    window.history.pushState(stateObj, 'home', '/');

    this.updateRoute({ newRoute });
  }

  renderView = () => {
    const { currentRoute } = this.state;

    switch (currentRoute.name)
    {
      case 'viewpost':
        return (
          <PostPageContainer
            updateRoute={this.updateRoute}
            params={currentRoute}
          />
        );
      case 'home':
      default:
        return (
          <PostsListContainer
            updateRoute={this.updateRoute}
          />
        );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-logo">LT</span>
          <span className="App-title"><a href="/" onClick={this.onTitleClick}>LiveThreads</a></span>
        </header>
        <main className="App-main">
          {this.renderView()}
        </main>
      </div>
    );
  }
}

export default App;
