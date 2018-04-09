import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('can do arithmetic', () => {
  expect(1+1).toEqual(3);
  expect(!true).toEqual(false);
});
