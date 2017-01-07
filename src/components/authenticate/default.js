import React, { Component, PropTypes } from 'react';
import format from 'string-template';
import { camelizeKeys } from 'humps';
import { get } from 'axios';
import './default.scss';
import config from '../../../.instamap.yml';

export default class Authenticate extends Component {

    /**
     * @constant state
     * @type {Object}
     */
    state = { errorMessage: '' };

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        redirecter: PropTypes.func,
        location: PropTypes.shape({
            query: PropTypes.shape({
                code: PropTypes.string
            }).isRequired
        }).isRequired
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
        }

    };

    /**
     * @method shouldComponentUpdate
     * @param {Object} nextProps
     * @param {Object} nextState
     * @return {Boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {

        const codeEqual = this.props.location.query === nextProps.location.query;
        const errorMessageEqual = this.state.errorMessage === nextState.errorMessage;

        return !codeEqual || !errorMessageEqual;

    }

    /**
     * @method redirect
     * @return {void}
     */
    redirect() {

        // Construct the URL that the user will be sent to for authentication.
        const { instamap: { redirectUri }, instagram: { clientId, authUri } } = camelizeKeys(config);
        const url = format(authUri, { redirectUri, clientId });

        // Invoke the redirecter which will forward the user to Instagram to authenticate the app.
        this.props.redirecter(url);

    }

    /**
     * @method notification
     * @param {String|null} [errorMessage = '']
     * @return {[XML, XML]}
     */
    notification(errorMessage = '') {

        return [
            errorMessage && <div key="error" className="error">Problem: {errorMessage}</div>,
            <p key="message">Unfortunately Instagram requires users to authorise applications before displaying any public content.</p>,
            <button key="action" accessKey="a" onClick={() => this.redirect()}>Authenticate</button>
        ];

    }

    /**
     * @method authenticate
     * @param {String} code
     * @return {[XML, XML]}
     */
    authenticate(code) {

        get(`/authenticate/${code}`)
            .then(response => console.log(camelizeKeys(response.data).accessToken))
            .catch(err => {

                // Re-render the component with the locally stored error from the API.
                const { errorMessage } = camelizeKeys(err.response.data);
                this.setState({ errorMessage });

            });

        return [
            <img key="loading" src="/images/loading.svg" alt="Loading" />,
            <p key="message">Please wait a moment whilst we authenticate you...</p>
        ];

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { code, errorDescription } = camelizeKeys({ ...this.props.location.query });
        const errorMessage = this.state.errorMessage || errorDescription;
        const isAuthenticating = code && !errorMessage;

        return (
            <section className="authenticate">
                {isAuthenticating ? this.authenticate(code) : this.notification(errorMessage)}
            </section>
        );

    }
}
