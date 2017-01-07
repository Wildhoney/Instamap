import React, { Component } from 'react';
import './default.scss';
import Header from '../../components/header/default';
import Authenticate from '../../components/authenticate/default';

export default class Layout extends Component {

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="layout">
                <Header />
                <main>
                    <Authenticate />
                </main>
            </section>
        );

    }
}
