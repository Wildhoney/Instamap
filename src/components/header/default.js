import React, { Component } from 'react';
import './default.scss';

export default class Header extends Component {

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="header">
                <h1>Instamap.</h1>
                <ul>
                    <li>Hello, <a href="https://www.instagram.com/wildhoooney/">Wildhoney</a></li>
                    <li><img src="https://avatars1.githubusercontent.com/u/1528477?v=3&s=460" alt="Profile Picture"/></li>
                </ul>
            </section>
        );

    }
}
