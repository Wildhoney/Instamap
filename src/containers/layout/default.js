import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './default.scss';
import Header from '../../components/header/default';
import Authenticate from '../../components/authenticate/default';
import Map from '../../components/map/default';

/**
 * @method handleState
 * @param {Object} state
 * @return {Object}
 */
function handleState(state) {

    return {
        user: state.shared.user
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
     * @method shouldComponentUpdate
     * @param {Object} nextProps
     * @return {Boolean}
     */
    shouldComponentUpdate(nextProps) {

        const userEqual = this.props.user === nextProps.user;

        return !userEqual;

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { user } = this.props;
        const isAuthenticated = 'id' in user;

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
