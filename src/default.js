import React from 'react';
import { render } from 'react-dom';
import Layout from './containers/layout/default';
import './default.scss';

($document => {

    // Render the component tree into the chosen node.
    render(<Layout />, $document.querySelector('section.app'));

})(window.document);
