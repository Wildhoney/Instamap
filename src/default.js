import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import getRoutes from './router';
import reducers from './reducers';
import promise from './middleware/promise';

($document => {

    // Setup Redux with the middleware and the associated reducers.
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    const store = createStoreWithMiddleware(reducers);

    // Render the component tree into the chosen node.
    const mountNode = $document.querySelector('section.app');
    render(<Provider store={store}>{getRoutes(store)}</Provider>, mountNode);

})(window.document);
