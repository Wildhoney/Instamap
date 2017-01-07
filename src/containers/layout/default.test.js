import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Header from '../../components/header/default';
import Authenticate from '../../components/authenticate/default';
import Layout from './default';

test('It should be able to find the necessary components;', t => {
    const wrapper = shallow(<Layout />);
    t.is(wrapper.find(Header).length, 1);
    t.is(wrapper.find(Authenticate).length, 1);
});
