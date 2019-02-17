import { API_BASE_URL } from '@helpers/constants';

const getAllAuthors = () => {
  return new Promise((resolve) => {
    fetch(`${API_BASE_URL}/authors`)
    .then(res => res.json())
    .then((authors) => {
      resolve(authors);
    });
  });
};

const getAuthorById = ({ authorId }) => {
  return new Promise((resolve) => {
    fetch(`${API_BASE_URL}/authors/${authorId}`)
    .then(res => res.json())
    .then((author) => {
      resolve(author);
    });
  });
};

export default {
  getAll: getAllAuthors,
  getById: getAuthorById,
};
