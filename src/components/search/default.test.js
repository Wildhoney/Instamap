import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Search from './default';

test('It should be able to render the search field;', t => {
    const wrapper = shallow(<Search />);
    t.is(wrapper.find('input').length, 1);
    t.is(wrapper.find('button').length, 1);
});
