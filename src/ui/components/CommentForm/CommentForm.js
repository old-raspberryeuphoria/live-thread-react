import React, { Component } from 'react';
import handleComments from 'src/api/comments.js';
import './CommentForm.scss';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.textareaRef = React.createRef();

    this.state = {
      commentText: null,
      success: null,
      error: null,
    };
  }

  hangleChange = e => {
    this.setState({ commentText: e.target.value });
  }

  submitComment = e => {
    const { commentText: body } = this.state;
    const { onSubmit, post } = this.props;

    handleComments.create({
      postId: post.id,
      body,
    })
    .then((res) => {
      this.setState({ commentText: null});
      
      const textarea = this.textareaRef.current;
      textarea.value = null;

      if (res.success) {
        this.setState({ success: res.success });
  
        if (onSubmit) {
          onSubmit(res);
        }
      } else {
        this.setState({ error: res.error });
      }
    });
  }

  renderSuccessMessage = () => {
    const { success, error } = this.state;

    if (success) {
      return (
        <span className="CommentForm-alert-success">
          Your comment was submitted with success!
        </span>
      );
    } else if (error) {
      return (
        <span className="CommentForm-alert-error">
          There was in error with your submission. Please try again.
        </span>
      );
    }
  }

  render() {
    const { commentText } = this.state;

    return (
      <div className="CommentForm">
        <textarea ref={this.textareaRef} onChange={this.hangleChange}></textarea>
        <input
          type="submit"
          value="add comment"
          onClick={this.submitComment}
          disabled={!commentText || !commentText.trim().length}
        />
        <p className="CommentForm-alert">
          {this.renderSuccessMessage()}
        </p>
      </div>
    );
  }
}

export default CommentForm;
