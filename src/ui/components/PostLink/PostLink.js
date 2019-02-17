import React, { Component } from 'react';
import relativeTime from '@helpers/dates/relativeTime';
import './PostLink.scss';

class PostLink extends Component {
  getPostUrl = ({ id, url = null}) => {
    if (!url) {
      return `?postId=${id}`;
    }

    return url;
  }

  getPostTitle = ({ title, url = null }) => {
    if (!url) {
      return title;
    }

    /* eslint-disable no-useless-escape */
    const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    const domain = matches && matches[1].replace('www.', '');

    return (
      <>
        {title} <span className="PostLink-domain">({ domain })</span>
      </>
    );
  }

  handleTitleClick = (e, { id }) => {
    e.preventDefault();

    const { updateRoute } = this.props;

    const newRoute = {
      name: 'viewpost',
      postId: id,
    };
    
    const stateObj = { postId: id };
    window.history.pushState(stateObj, `post ${id}`, `/?postId=${id}`);

    updateRoute({ newRoute });
  }

  render() {
    const { post } = this.props;

    return (
      <div className="PostLink">
        <div className="PostLink-title">
          <a href={this.getPostUrl(post)}>{this.getPostTitle(post)}</a>
        </div>
        <div className="PostLink-details">
          submitted {relativeTime(post.createdAt)} by <span className="PostLink-authorname">{post.author.name}</span> |&nbsp;
          <a
            href={`?postId=${post.id}`}
            onClick={(e) => this.handleTitleClick(e, post)}
          >
            {post.commentsCount} comment{post.commentsCount > 1 ? 's' : ''}
          </a>
        </div>
      </div>
    );
  }
}

export default PostLink;


