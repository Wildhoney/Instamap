import { get } from 'axios';
import { FETCH_USER, FETCH_MEDIA, SET_ERROR } from './types';

/**
 * @constant SELF
 * @type {String}
 */
const SELF = 'self';

/**
 * @method fetchUser
 * @param {String} accessToken
 * @param {String} [userId = SELF]
 * @return {Object}
 */
export function fetchUser(accessToken, userId = SELF) {
    const promise = get(`/user/${userId}/${accessToken}`).then(response => response.data);
    return { type: FETCH_USER, promise };
}

/**
 * @method fetchMedia
 * @param {String} accessToken
 * @param {String} [userId = SELF]
 * @return {Object}
 */
export function fetchMedia(accessToken, userId = SELF) {
    const promise = get(`/media/${userId}/${accessToken}`).then(response => response.data);
    return { type: FETCH_MEDIA, promise };
}

/**
 * @method setError
 * @param {String} error
 * @return {Object}
 */
export function setError(error) {
    return { type: SET_ERROR, result: error };
}
