import { camelizeKeys } from 'humps';
import Symbol from 'es6-symbol';

/**
 * @constant SUCCESS
 * @type {String}
 */
export const SUCCESS = Symbol('success');

/**
 * @constant FAILURE
 * @type {String}
 */
export const FAILURE = Symbol('failure');

/**
 * @constant REQUEST
 * @type {String}
 */
export const REQUEST = Symbol('request');

/**
 * @method promise
 * @return {Function}
 */
export default () => {

    return next => action => {

        const { promise, ...rest } = action;

        if (!promise) {
            return next({ ...action, readyState: SUCCESS });
        }

        next({ ...rest, readyState: REQUEST });

        return promise.then(
            result => next({ ...rest, result: camelizeKeys(result), readyState: SUCCESS }),
            error => next({ ...rest, error: camelizeKeys(error), readyState: FAILURE })
        );
    };

};
