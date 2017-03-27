import { SUCCESS, FAILURE } from '../middleware/promise';
import { KEY } from '../components/authenticate/default';
import { FETCH_USER, FETCH_MEDIA, SET_ERROR } from './types';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    user: {},
    media: [],
    error: ''
};

/**
 * @method handleError
 * @param {String} exceptionType
 * @param {Object} state
 * @return {Object}
 */
function handleError(exceptionType, state) {

    switch (exceptionType) {

        case 'OAuthAccessTokenException':
            window.localStorage.removeItem(KEY);
            return { ...state, user: {} };

        default:
            return state;

    }

}

export default (state = INITIAL_STATE, action) => {

    switch (action.readyState) {

        case SUCCESS:

            switch (action.type) {

                case FETCH_USER:
                    return { ...state, user: action.result };

                case FETCH_MEDIA:
                    return { ...state, media: action.result };

                case SET_ERROR:
                    return { ...state, error: action.result };

                default:
                    return state;

            }

        case FAILURE:

            // When a failure occurs where the access token is invalid, we'll remove the access token
            // from the local storage, and force the user to re-authenticate.
            const { errorType } = action.error.response.data.meta;
            return handleError(errorType, state);

    }

    return state;

};
