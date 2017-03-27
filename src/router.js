import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import progress from 'nprogress';
import Layout from './containers/layout/default';
import Profile from './containers/profile/default';

/**
 * @method fetchFor
 * @param {Object} store
 * @return {Function}
 */
const fetchFor = store => {

    /**
     * @param {Object} params
     * @param {Object} routes
     * @param {Function} replace
     * @param {Function} callback
     * @return {Promise}
     */
    return ({ params, routes, location }, replace, callback) => {

        /**
         * @method done
         * @return {void}
         */
        const done = () => {
            progress.done();
            callback();
        };

        /**
         * @method fail
         * @param {Object} err
         * @return {void}
         */
        const fail = err => {
            console.log(err);
        };

        progress.start();
        progress.inc(0.3);

        const promises = routes.map(route => {

            const { component } = route;
            const fetchesData = component && typeof component.fetchData === 'function';
            return fetchesData ? component.fetchData(store.dispatch, { ...params, location }) : Promise.resolve();

        });

        return Promise.all(promises).then(done).catch(fail);

    };

};

export default store => {

    const fetchData = fetchFor(store);

    return (
        <Router history={browserHistory}>
            <Route path="/" component={Layout} onEnter={fetchData}>
                <Route path="/profile/:userId" component={Profile} onEnter={fetchData} />
            </Route>
        </Router>
    );

};
