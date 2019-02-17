import React, { Component } from 'react';
import handlePosts from 'src/api/posts.js';
import PostPage from '@ui/components/PostPage/PostPage';

class PostPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      post: null,
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    const { postId } = this.props.params;

    handlePosts.getById({ postId })
    .then((res) => {
      this.setState({
        isLoading: false,
        post: res,
      });
    });
  };

  render() {
    const { updateRoute } = this.props;
    const { isLoading, post } = this.state;

    return <PostPage
      updateRoute={updateRoute}
      isLoading={isLoading}
      post={post}
    />;
  }
}

export default PostPageContainer;
