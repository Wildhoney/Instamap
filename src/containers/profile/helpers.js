/**
 * @constant STORAGE_KEY
 * @type {String}
 */
const STORAGE_KEY = 'accessToken';

/**
 * @method getAccessToken
 * @return {String|null}
 */
export const getAccessToken = () => window.localStorage.getItem(STORAGE_KEY);

/**
 * @method setAccessToken
 * @param {String} accessToken
 * @return {String}
 */
export const setAccessToken = accessToken => {
    window.localStorage.setItem(STORAGE_KEY, accessToken);
    return accessToken;
};

/**
 * @method removeParameter
 * @param {String} accessToken
 * @return {String}
 */
export const removeParameter = accessToken => {
    window.history.pushState(null, '', window.location.href.split('?')[0]);
    return accessToken;
};
