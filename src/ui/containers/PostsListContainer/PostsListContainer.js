import React, { Component } from 'react';
import handlePosts from 'src/api/posts.js';
import PostsList from '@ui/components/PostsList/PostsList';

class PostsListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: null,
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    handlePosts.getAll()
    .then((res) => {
      this.setState({
        isLoading: false,
        posts: res,
      });
    });
  }

  render() {
    const { updateRoute } = this.props;
    const { isLoading, posts } = this.state;

    return <PostsList
      updateRoute={updateRoute}
      isLoading={isLoading}
      posts={posts}
    />;
  }
}

export default PostsListContainer;
