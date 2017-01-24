import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { identity } from 'ramda';
import { spy } from 'sinon';
import uuid from 'uuid/v1';
import axios from 'axios';
import { camelizeKeys } from 'humps';
import MockAdapter from 'axios-mock-adapter';
import Header from '../../components/header/default';
import Authenticate from '../../components/authenticate/default';
import Map from '../../components/map/default';
import { fetchUser, setError } from '../../shared/actions';
import MatchingCodeNotFound from '../../../tests/mocks/matching-code-not-found.json';
import AuthenticatedAccessToken from '../../../tests/mocks/authenticated-access-token.json';
import UserProfile from '../../../tests/mocks/user-profile.json';
import Component from './default';

const mock = new MockAdapter(axios);

test.beforeEach(t => {

    t.context.props = {
        user: {},
        error: '',
        location: { query: { code: 'test' } }
    };

    t.context.code = uuid();
    t.context.getParams = (query = {}) => {
        return { location: { query } };
    };

});

test('It should be able to render the authenticate component;', t => {

    const Layout = Component.WrappedComponent;
    const props = t.context.props;

    const wrapper = shallow(<Layout {...props} />);

    t.is(wrapper.find(Header).length, 1);
    t.is(wrapper.find(Authenticate).length, 1);

});

test('It should be able to render the map component;', t => {

    const Layout = Component.WrappedComponent;
    const props = { ...t.context.props, user: { id: '123' } };

    const wrapper = shallow(<Layout {...props} />);

    t.is(wrapper.find(Header).length, 1);
    t.is(wrapper.find(Map).length, 1);

});

test('It should be able to fetch the user from an access token;', async t => {

    const accessToken = uuid();

    mock.onGet(`/user/self/${accessToken}`).reply(200, UserProfile);

    const dispatch = spy(identity);
    const getToken = spy(() => accessToken);

    const response = await Component.WrappedComponent.fetchData(dispatch, t.context.getParams(), getToken);

    t.is(getToken.callCount, 1);
    t.is(response.type, fetchUser(accessToken).type);
    t.true(dispatch.calledWith(fetchUser(accessToken)));

});

test('It should be able to handle any errors in the URL parameters;', async t => {

    const errorDescription = 'An example error';

    const dispatch = spy(identity);
    const getToken = spy();

    const params = t.context.getParams({ errorDescription });
    const response = await Component.WrappedComponent.fetchData(dispatch, params, getToken);

    t.is(getToken.callCount, 1);
    t.is(response.type, setError(errorDescription).type);
    t.true(dispatch.calledWith(setError(errorDescription)));

});

test('It should be able to retrieve the user profile from the authentication code;', async t => {

    const { accessToken } = camelizeKeys(AuthenticatedAccessToken);
    const code = uuid();

    mock.onGet(`/user/self/${accessToken}`).reply(200, UserProfile);
    mock.onGet(`/authenticate/${code}`).reply(200, AuthenticatedAccessToken);

    const dispatch = spy(identity);
    const getToken = spy();
    const setToken = spy(identity);
    const stripParam = spy(identity);

    const params = t.context.getParams({ code });
    const response = await Component.WrappedComponent.fetchData(dispatch, params, getToken, setToken, stripParam);

    t.is(getToken.callCount, 1);
    t.is(setToken.callCount, 1);
    t.is(stripParam.callCount, 1);
    t.true(setToken.calledWith(accessToken));
    t.is(response.type, fetchUser(accessToken).type);

});

test('It should be able to handle errors when authenticating using the code;', async t => {

    const { errorMessage } = camelizeKeys(MatchingCodeNotFound);
    const code = uuid();

    mock.onGet(`/authenticate/${code}`).reply(403, MatchingCodeNotFound);

    const dispatch = spy(identity);
    const getToken = spy();

    await Component.WrappedComponent.fetchData(dispatch, t.context.getParams({ code }), getToken);

    t.is(getToken.callCount, 1);
    t.true(dispatch.calledWith(setError(errorMessage)));

});
