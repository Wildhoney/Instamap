import React, { Component } from 'react';
import './default.scss';

export default class Map extends Component {

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="map">

                <div className="search">
                    <input type="text" placeholder="Specify an Instagram username..." />
                    <button type="button">Create Map</button>
                </div>

                <label>Loading Maps...</label>

            </section>
        );

    }

}
