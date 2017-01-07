import React, { Component, PropTypes } from 'react';
import './default.scss';
import format from 'string-template';
import { camelizeKeys } from 'humps';
import config from '../../../.instamap.yml';

export default class Authenticate extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        redirecter: PropTypes.func
    };

    /**
     * @constant defaultProps
     * @type {Object}
     */
    static defaultProps = {
        redirecter: path => window.location.href = path
    };

    /**
     * @method redirect
     * @return {void}
     */
    redirect() {

        // Construct the URL that the user will be sent to for authentication.
        const { instamap: { redirectUrl }, instagram: { clientId, authUrl } } = camelizeKeys(config);
        const url = format(authUrl, { redirectUrl, clientId });

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
                <p>Unfortunately Instagram requires users to authorise applications before displaying any public content.</p>
                <button accessKey="a" onClick={() => this.redirect()}>Authenticate</button>
            </section>
        );

    }
}
