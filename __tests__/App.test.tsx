/**
 * @format
 */

import App from '../App';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
jest.mock('react-native-simple-radio-button');

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
