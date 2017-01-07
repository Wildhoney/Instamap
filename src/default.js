import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import routes from './router';
import reducers from './reducers';
import promise from './middleware/promise';

($document => {

    // Setup Refux with the middleware and the associated reducers.
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    const store = createStoreWithMiddleware(reducers);

    // Render the component tree into the chosen node.
    render(<Provider store={store}>{routes}</Provider>, $document.querySelector('section.app'));

})(window.document);
