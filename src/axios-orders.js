import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-96345.firebaseio.com/',
});

export default instance;
