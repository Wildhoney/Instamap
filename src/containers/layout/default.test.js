import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Header from '../../components/header/default';
import Authenticate from '../../components/authenticate/default';
import Component from './default';

test('It should be able to find the necessary components;', t => {

    const Layout = Component.WrappedComponent;
    const props = {
        location: {
            query: {
                code: 'test'
            }
        },
        user: {},
        dispatch: () => {},
        browserHistory: { push: () => {} }
    };

    const wrapper = shallow(<Layout {...props} />);

    t.is(wrapper.find(Header).length, 1);
    t.is(wrapper.find(Authenticate).length, 1);

});
