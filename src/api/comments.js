import { API_BASE_URL } from '@helpers/constants';
import handleAuthors from 'src/api/authors.js';

const getAllComments = () => {
  return new Promise((resolve) => {
    fetch(`${API_BASE_URL}/comments`)
    .then(res => res.json())
    .then((comments) => {
      resolve(comments);
    });
  })
};

const getAllCommentsInPost = ({ postId }) => {
  return new Promise((resolve) => {
    fetch(`${API_BASE_URL}/comments?postId=${postId}`)
    .then(res => res.json())
    .then((comments) => {
      const promises = [];

      comments.forEach((comment) => {
        const getAuthor = new Promise((resolve) => {
          handleAuthors.getById({ authorId: comment.authorId })
          .then((author) => {
            comment.author = author;
            resolve();
          });
        });

        promises.push(getAuthor);
      });

      Promise.all(promises)
      .then(() => {
        resolve(comments);
      });
    });
  });
};

const createComment = ({ postId, body }) => {
  return new Promise((resolve) => {
    fetch(`${API_BASE_URL}/comments?postId=${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        authorId: null,
        createdAt: + new Date() / 1000,
        postId,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
    .then(response => response.json())
    .then(comment => {
      // To simulate an error, let's say one in 10 submissions ends up as a failure
      const rand = Math.floor(Math.random() * 10) + 1;

      resolve({
        success: rand > 1 ? true : false,
        error: rand === 1 ? true : false,
        comment,
      });
    });
  });
};

export default {
  getAll: getAllComments,
  getAllInPost: getAllCommentsInPost,
  create: createComment,
};
