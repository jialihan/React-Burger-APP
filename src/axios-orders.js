import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://jelly-burger.firebaseio.com/'
});

export default instance;
