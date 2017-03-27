import React, { Component, PropTypes } from 'react';
import './default.scss';

export default class Header extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        user: PropTypes.shape({
            id: PropTypes.string,
            fullName: PropTypes.string,
            profilePicture: PropTypes.string,
            username: PropTypes.string
        }).isRequired
    };

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { user } = this.props;
        const isAuthenticated = 'id' in user;

        return (
            <section className="header">

                <h1>Instamap.</h1>

                {isAuthenticated && (

                    <ul>
                        <li>Hello, <a href={`https://www.instagram.com/${user.username}/`}>{user.fullName}</a></li>
                        <li><img src={user.profilePicture} alt="Profile Picture" /></li>
                    </ul>

                )}

            </section>
        );

    }
}
