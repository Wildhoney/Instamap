import React, { Component, PropTypes } from 'react';
import format from 'string-template';
import { camelizeKeys } from 'humps';
import config from '../../../.instamap.yml';
import './default.scss';

/**
 * @constant KEY
 * @type {String}
 */
export const KEY = 'accessToken';

export default class Authenticate extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        redirecter: PropTypes.func,
        redirectUri: PropTypes.func.isRequired,
        error: PropTypes.string.isRequired
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {

        /**
         * @method redirecter
         * @param {String} path
         * @return {void}
         */
        redirecter: path => {
            window.location.href = path;
        },

        /**
         * @constant redirectUri
         * @type {Function}
         */
        redirectUri: () => format(camelizeKeys(config).instamap.redirectPattern, { redirectUri: window.location.origin })

    };

    /**
     * @method redirect
     * @return {void}
     */
    redirect() {

        // Construct the URL that the user will be sent to for authentication.
        const redirectUri = this.props.redirectUri();
        const { instagram: { clientId, authUri } } = camelizeKeys(config);
        const url = format(authUri, { redirectUri, clientId });

        // Invoke the redirecter which will forward the user to Instagram to authenticate the app.
        this.props.redirecter(url);

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="authenticate">
                {this.props.error && <div className="error">Problem: {this.props.error}</div>}
                <img className="logo" src="/images/instagram.jpg" alt="Instagram" />
                <p>Unfortunately Instagram requires users to authorise applications before displaying any public content.</p>
                <button accessKey="a" onClick={() => this.redirect()}>Authenticate</button>
            </section>
        );

    }

}
