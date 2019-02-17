import { API_BASE_URL } from '@helpers/constants';
import handleComments from 'src/api/comments.js';
import handleAuthors from 'src/api/authors.js';

const getAllPosts = () => {
  return new Promise((resolve) => {
    fetch(`${API_BASE_URL}/posts`)
    .then(res => res.json())
    .then((posts) => {
      const promises = [];

      posts.forEach((post) => {
        const getAuthor = new Promise((resolve) => {
          handleAuthors.getById({ authorId: post.authorId })
          .then((author) => {
            post.author = author;
            resolve();
          });
        });

        promises.push(getAuthor);
      });

      Promise.all(promises)
      .then(() => {
        resolve(posts);
      });
    });
  })
};

const getPostById = ({ postId }) => {
  return new Promise((resolve) => {
    fetch(`${API_BASE_URL}/posts/${postId}`)
    .then(res => res.json())
    .then((post) => {
      const promises = [];

      const getAuthor = new Promise((resolve) => {
        handleAuthors.getById({ authorId: post.authorId })
        .then((author) => {
          post.author = author;
          resolve();
        });
      });

      promises.push(getAuthor);

      const getComments = new Promise((resolve) => {
        handleComments.getAllInPost({ postId })
        .then((comments) => {
          post.comments = comments;
          resolve();
        });
      });

      promises.push(getComments);

      Promise.all(promises)
      .then(() => {
        resolve(post);
      });
    });
  });
};

const createPost = ({ title }) => {

};

const updatePost = ({ postId, title }) => {

};

const deletePost = ({ postId }) => {

};

export default {
  getAll: getAllPosts,
  getById: getPostById,
  create: createPost,
  update: updatePost,
  delete: deletePost,
};
