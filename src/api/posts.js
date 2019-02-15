const getAllPosts = () => {
  fetch('https://my-json-server.typicode.com/thomasmion/live-thread-db/posts')
  .then((res) => {
    console.log(res);
  });
};

const getPostById = ({ postId }) => {

};

const createPost = ({ title }) => {

};

const updatePost = ({ postId, title }) => {

};

const deletePost = ({ postId }) => {

};

export const handlePosts = {
  getAll: getAllPosts,
  getById: getPostById,
  create: createPost,
  update: updatePost,
  delete: deletePost,
};
