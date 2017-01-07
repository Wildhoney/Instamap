import React from 'react';
import test from 'ava';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { camelizeKeys } from 'humps';
import format from 'string-template';
import config from '../../../.instamap.yml';
import MatchingCodeNotFound from '../../../tests/mocks/matching-code-not-found.json';
import AuthenticatedAccessToken from '../../../tests/mocks/authenticated-access-token.json';
import Authenticate from './default';

test.beforeEach(t => {

    t.context.mock = new MockAdapter(axios);
    t.context.getProps = (query = {}) => {

        return {
            redirecter: spy(),
            location: { query }
        };

    };

});

test('It should be able to redirect the user to authenticate;', t => {

    const { instamap: { redirectUri }, instagram: { clientId, authUri } } = camelizeKeys(config);
    const url = format(authUri, { redirectUri, clientId });

    const props = t.context.getProps();
    const wrapper = shallow(<Authenticate {...props} />);
    const button = wrapper.find('button');

    button.simulate('click');

    t.true(props.redirecter.called);
    t.true(props.redirecter.calledWith(url));

});

test('It should be able to render the error message from the URL params;', t => {

    const props = t.context.getProps({ errorDescription: 'An example error' });
    const wrapper = shallow(<Authenticate {...props} />);

    t.is(wrapper.find('div.error').text(), 'Problem: An example error');
    t.is(wrapper.find('button').length, 1);

});

test('It should be able to render the error from the authentication endpoint;', t => {

    t.context.mock.onGet('/authenticate/abc123').reply(403, MatchingCodeNotFound);

    const props = t.context.getProps({ code: 'abc123' });
    const wrapper = shallow(<Authenticate {...props} />);

    t.is(wrapper.find('button').length, 0);
    t.is(wrapper.find('p').text(), 'Please wait a moment whilst we authenticate you...');

    return new Promise(resolve => {

        setTimeout(() => {

            // Once the error has been raised by the endpoint, the view should have reverted.
            t.is(wrapper.find('button').length, 1);
            t.is(wrapper.find('div.error').text(), 'Problem: Matching code was not found or was already used.');
            resolve();

        });

    });

});

test('It should be able to retrieve the profile data when authentication is successful;', t => {

    t.context.mock.onGet('/authenticate/abc123').reply(200, AuthenticatedAccessToken);

    const props = t.context.getProps({ code: 'abc123' });
    const wrapper = shallow(<Authenticate {...props} />);

    t.is(wrapper.find('button').length, 0);
    t.is(wrapper.find('p').text(), 'Please wait a moment whilst we authenticate you...');

    return new Promise(resolve => {

        setTimeout(() => {

            // Once the authentication has been successful, the app should be rendered.
            // todo: Add the test for the actual app rendering.
            resolve();

        });

    });

});
