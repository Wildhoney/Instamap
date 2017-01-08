import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';
import Search from '../search/default';
import './default.scss';

export default class Map extends Component {

    /**
     * @method node
     * @param {HTMLElement} node
     * @return {void}
     */
    map(node) {

        GoogleMapsLoader.KEY = 'AIzaSyCgqI70Yz4ETQ_IHtQLV8QhJ12VMJ6jDBY';

        GoogleMapsLoader.load(google => {

            const center = new google.maps.LatLng(-34.397, 150.644);
            const options = { center, zoom: 15, zoomControl: true };

            new google.maps.Map(node, options);

        });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        return (
            <section className="map">
                <Search {...this.props} />
                <div className="container" ref={node => node && this.map(node)} />
            </section>
        );

    }

}
