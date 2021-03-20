/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

jest.useFakeTimers();

describe('App', () => {
  it('renders correctly', () => {
    const {debug} = render(<App />);
    debug();
  });
});
