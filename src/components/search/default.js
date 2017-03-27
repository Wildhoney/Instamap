import React, { Component } from 'react';
import './default.scss';

export default class Map extends Component {

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="search">
                <input type="text" placeholder="Enter an Instagram username..." />
                <button type="button" disabled>Create Map</button>
            </section>
        );

    }

}
