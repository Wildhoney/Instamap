import React, { Component, PropTypes } from 'react';
import format from 'string-template';
import { camelizeKeys } from 'humps';
import { get } from 'axios';
import { browserHistory } from 'react-router';
import { fetchUser } from '../../shared/actions';
import config from '../../../.instamap.yml';
import './default.scss';

/**
 * @constant KEY
 * @type {String}
 */
export const KEY = 'accessToken';

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
        }).isRequired,
        dispatch: PropTypes.func.isRequired,
        getAccessToken: PropTypes.func.isRequired,
        setAccessToken: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        browserHistory: PropTypes.object.isRequired,
        redirectUri: PropTypes.func.isRequired
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
         * @method getAccessToken
         * @return {String}
         */
        getAccessToken: () => window.localStorage.getItem(KEY),

        /**
         * @method setAccessToken
         * @param {String} accessToken
         * @return {void}
         */
        setAccessToken: accessToken => window.localStorage.setItem(KEY, accessToken),

        /**
         * @constant browserHistory
         * @type {Object}
         */
        browserHistory,

        /**
         * @constant redirectUri
         * @type {Function}
         */
        redirectUri: () => format(camelizeKeys(config).instamap.redirectPattern, { redirectUri: window.location.origin })

    };

    /**
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {

        // Attempt to load the user profile from the stored access token.
        const accessToken = this.props.getAccessToken();
        accessToken && this.props.dispatch(fetchUser(accessToken)).then(this.redirectRoot.bind(this));

    }

    /**
     * @method shouldComponentUpdate
     * @param {Object} nextProps
     * @param {Object} nextState
     * @return {Boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {

        const codeEqual = this.props.location.query === nextProps.location.query;
        const errorMessageEqual = this.state.errorMessage === nextState.errorMessage;
        const userEqual = this.props.user === nextProps.user;

        return !codeEqual || !errorMessageEqual || !userEqual;

    }

    /**
     * @method redirectInstagram
     * @return {void}
     */
    redirectInstagram() {

        // Construct the URL that the user will be sent to for authentication.
        const redirectUri = this.props.redirectUri();
        const { instagram: { clientId, authUri } } = camelizeKeys(config);
        const url = format(authUri, { redirectUri, clientId });

        // Invoke the redirecter which will forward the user to Instagram to authenticate the app.
        this.props.redirecter(url);

    }

    /**
     * @method redirectRoot
     * @return {void}
     */
    redirectRoot() {

        // Redirect to the root path to remove any query parameters.
        this.props.browserHistory.push('/');

    }

    /**
     * @method notification
     * @param {String|null} [errorMessage = '']
     * @return {[XML, XML]}
     */
    notification(errorMessage = '') {

        return [
            errorMessage && <div key="error" className="error">Problem: {errorMessage}</div>,
            <img key="logo" className="logo" src="/images/instagram.jpg" alt="Instagram" />,
            <p key="message">Unfortunately Instagram requires users to authorise applications before displaying any public content.</p>,
            <button key="action" accessKey="a" onClick={() => this.redirectInstagram()}>Authenticate</button>
        ];

    }

    /**
     * @method authenticate
     * @param {String} code
     * @return {[XML, XML]}
     */
    authenticate(code) {

        code && get(`/authenticate/${code}`)
            .then(response => {

                // Dispatch the action to fetch the user profile, and store the access token for subsequent
                // page loads.
                const accessToken = camelizeKeys(response.data).accessToken;
                this.props.dispatch(fetchUser(accessToken)).then(this.redirectRoot.bind(this));
                this.props.setAccessToken(accessToken);

            })
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

        const { getAccessToken } = this.props;
        const { code, errorDescription } = camelizeKeys({ ...this.props.location.query });
        const errorMessage = this.state.errorMessage || errorDescription;
        const isAuthenticating = Boolean(getAccessToken() || (code && !errorMessage));

        // We only make the request for the access token if we don't already have one.
        const requestCode = getAccessToken() ? null : code;

        return (
            <section className="authenticate">
                {isAuthenticating ? this.authenticate(requestCode) : this.notification(errorMessage)}
            </section>
        );

    }

}
