import { get } from 'axios';
import { FETCH_USER } from './types';

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
