import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Layout from './containers/layout/default';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Layout} />
    </Router>
);
