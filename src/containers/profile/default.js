import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys } from 'humps';
import { get } from 'axios';
import { getAccessToken } from '../layout/helpers';
import { fetchMedia } from '../../shared/actions';
import Map from '../../components/map/default';
import './default.scss';

/**
 * @method handleState
 * @param {Object} state
 * @return {Object}
 */
function handleState(state) {

    return {
        media: state.shared.media
    };

}

export default connect(handleState)(class Layout extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        media: PropTypes.array.isRequired
    };

    /**
     * @method fetchData
     * @param {Function} dispatch
     * @param {Object} params
     * @param {Function} [getToken = getAccessToken]
     * @return {Promise}
     */
    static fetchData = (dispatch, params, getToken = getAccessToken) => {

        const { userId } = params;
        const accessToken = getToken();

        return dispatch(fetchMedia(accessToken));

    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="profile">
                <Map {...this.props} />
            </section>
        );

    }

});
