import axios from 'axios';

const API = 'http://serversh1.ml:8029/';
//const API = 'http://localhost:8080/';

/**
 * @description axios config
 */
export default axios.create({
    baseURL: API,
    headers: {
        "Content-type": "application/json",
    }
});