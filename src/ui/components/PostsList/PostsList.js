import React, { Component } from 'react';
import LoadingText from '@ui/components/LoadingText/LoadingText';
import PostLink from '@ui/components/PostLink/PostLink';
import './PostsList.scss';

class PostsList extends Component {
  render() {
    const { updateRoute, isLoading, posts } = this.props;

    if (isLoading) {
      return <LoadingText />;
    }

    return (
      <div className="PostsList">
          {posts.map((post, i) => {
            return (
              <div className="PostsList-postrow" key={post.id}>
                <span className="PostsList-postrow-index">{i + 1}.</span>
                <PostLink
                  updateRoute={updateRoute}
                  post={post}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default PostsList;
