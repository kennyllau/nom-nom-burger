import axios from 'axios';

const instance = axios.create({
    baseURL: '/some base url '
});

export default instance;