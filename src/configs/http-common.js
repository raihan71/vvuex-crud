import axios from 'axios';

const HTTP = axios.create({
  baseURL: `https://pasarikan.herokuapp.com/`,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default HTTP;