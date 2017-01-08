import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys } from 'humps';
import { compose } from 'ramda';
import { get } from 'axios';
import Header from '../../components/header/default';
import Authenticate from '../../components/authenticate/default';
import Map from '../../components/map/default';
import { fetchUser, setError } from '../../shared/actions';
import { setAccessToken, getAccessToken, removeParameter } from './helpers';
import './default.scss';

/**
 * @method handleState
 * @param {Object} state
 * @return {Object}
 */
function handleState(state) {

    return {
        user: state.shared.user,
        error: state.shared.error
    };

}

export default connect(handleState)(class Layout extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    /**
     * @method fetchData
     * @param {Function} dispatch
     * @param {Object} params
     * @param {Function} [getToken = getAccessToken]
     * @param {Function} [setToken = setAccessToken]
     * @param {Function} [stripParam = removeParameter]
     * @return {Promise}
     */
    static fetchData = (dispatch, params, getToken = getAccessToken, setToken = setAccessToken, stripParam = removeParameter) => {

        const accessToken = getToken();
        const { code, errorDescription } = camelizeKeys({ ...params.location.query });

        switch (true) {

            case Boolean(accessToken):
                return dispatch(fetchUser(accessToken));

            case Boolean(errorDescription):
                return dispatch(setError(errorDescription));

            case Boolean(code):
                return get(`/authenticate/${code}`)
                    .then(response => camelizeKeys(response.data).accessToken)
                    .then(compose(stripParam, setToken))
                    .then(accessToken => dispatch(fetchUser(accessToken)))
                    .catch(err => dispatch(setError(camelizeKeys(err.response.data).errorMessage)));

        }

    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        // Determine if the client is authenticated by the user model.
        const isAuthenticated = 'id' in this.props.user;

        return (
            <section className="layout">
                <Header {...this.props} />
                <main>
                    {isAuthenticated ? <Map {...this.props} /> : <Authenticate {...this.props} />}
                </main>
            </section>
        );

    }

});
