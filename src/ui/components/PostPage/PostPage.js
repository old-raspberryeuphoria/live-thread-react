import React, { Component } from 'react';
import relativeTime from '@helpers/dates/relativeTime';
import CommentForm from '@ui/components/CommentForm/CommentForm';
import LoadingText from '@ui/components/LoadingText/LoadingText';
import PostLink from '@ui/components/PostLink/PostLink';
import './PostPage.scss';

class PostPage extends Component {
  /**
   * This method should be used as callback in the comment form
   */
  addComment = ({ comment }) => {
    const newPost = { ...this.props.post };
    newPost.comments.push(comment);

    // Since the new comment is in a "post" prop and not in a state,
    // there is no point in calling this.setState
    this.forceUpdate();
  }

  render() {
    const { updateRoute, isLoading, post } = this.props;

    if (isLoading) {
      return <LoadingText />;
    }

    return (
      <div className="PostPage">
        <PostLink
          updateRoute={updateRoute}
          post={post}
        />
        {post.body && (
          <p className="PostPage-op">
            {post.body}
          </p>
        )}
        <CommentForm
          post={post}
          onSubmit={this.addComment}
        />
        <div className="PostPage-comments">
          {post.comments.length === 0 && (
            <p>There are no comments yet in this thread.</p>
          )}
          {post.comments.length > 0 && post.comments.map((comment) => {
            return (
              <div className="PostPage-comment" key={comment.id}>
                <span className="PostPage-comment-header">
                  submitted {relativeTime(comment.createdAt)} by <span className="PostPage-authorname">{comment.author ? comment.author.name : 'anonymous'}</span>
                </span>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PostPage;
