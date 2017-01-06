import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Header from './default';

test('It should be able to render the header title;', t => {
    const wrapper = shallow(<Header />);
    t.is(wrapper.find('h1').text(), 'Instamap.');
});
