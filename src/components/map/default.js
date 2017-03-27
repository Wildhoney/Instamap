import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import { camelizeKeys } from 'humps';
import config from '../../../.instamap.yml';
import Search from '../search/default';
import './default.scss';

export default class Map extends Component {

    /**
     * @method node
     * @param {HTMLElement} node
     * @return {void}
     */
    map(node) {

        // Instantiate L.Map and take the tile URI from the config.
        const map = new L.Map(node, { doubleClickZoom: false }).setView([51.505, -0.09], 14);
        L.tileLayer(camelizeKeys(config).instamap.tileUri).addTo(map);

        const icon = new L.DivIcon({ className: 'preview', iconSize: [100, 100] });
        const marker = new L.Marker([50.505, 30.57], { icon });

        const cluster = new L.MarkerClusterGroup();
        cluster.addLayer(marker);
        map.addLayer(cluster);
        map.fitBounds(cluster.getBounds());

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
