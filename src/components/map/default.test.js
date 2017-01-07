import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Map from './default';

test('It should be able to render the map;', t => {
    const wrapper = shallow(<Map />);
    t.is(wrapper.find('section.map').length, 1);
    t.is(wrapper.find('input').length, 1);
    t.is(wrapper.find('button').length, 1);
});
