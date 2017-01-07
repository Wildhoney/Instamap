import React from 'react';
import test from 'ava';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { camelizeKeys } from 'humps';
import format from 'string-template';
import Authenticate from './default';
import config from '../../../.instamap.yml';

test('It should be able to redirect the user to authenticate;', t => {

    const { instamap: { redirectUrl }, instagram: { clientId, authUrl } } = camelizeKeys(config);
    const url = format(authUrl, { redirectUrl, clientId });

    const props = { redirecter: spy(console.log) };
    const wrapper = shallow(<Authenticate {...props} />);
    const button = wrapper.find('button');

    button.simulate('click');

    t.true(props.redirecter.called);
    t.true(props.redirecter.calledWith(url));

});
