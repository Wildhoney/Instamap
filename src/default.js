import React from 'react';
import { render } from 'react-dom';
import Header from './components/header/default';
import './default.scss';

($document => {

    // Render the component tree into the chosen node.
    render(<Header />, $document.querySelector('section.app'));

})(window.document);
