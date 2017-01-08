import React from 'react';
import test from 'ava';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { camelizeKeys } from 'humps';
import format from 'string-template';
import config from '../../../.instamap.yml';
import Authenticate from './default';

test('It should be able to render errors if there are any;', t => {

    const props = { error: 'An example error' };
    const wrapper = shallow(<Authenticate {...props} />);
    t.is(wrapper.find('div.error').text(), 'Problem: An example error');

});

test('It should be able to redirect the user to authenticate;', t => {

    const { instagram: { clientId, authUri } } = camelizeKeys(config);
    const url = format(authUri, { redirectUri: t.context.redirectUri, clientId });

    const props = { error: '', redirecter: spy(), redirectUri: spy() };
    const wrapper = shallow(<Authenticate {...props} />);
    const button = wrapper.find('button');

    button.simulate('click');

    t.true(props.redirecter.called);
    t.true(props.redirecter.calledWith(url));

});
