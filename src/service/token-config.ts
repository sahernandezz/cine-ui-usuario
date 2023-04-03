/**
 * @description token
 */
const getToken = () => {
    return window.localStorage.getItem('USER_KEY');
}

export default getToken;