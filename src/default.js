import { render } from 'react-dom';
import routes from './router';

($document => {

    // Render the component tree into the chosen node.
    render(routes, $document.querySelector('section.app'));

})(window.document);
