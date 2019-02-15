import React, { Component } from 'react';
import handlePosts from 'src/api/posts';

class PostsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: null,
    };
  }

  componentDidMount() {
    handlePosts.getAll();
  }

  render() {
    return (
      <div>
        Posts...
      </div>
    );
  }
}

export default PostsContainer;
