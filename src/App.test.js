import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import Home from './Home'
import PageNotFound from './PageNotFound'

test('invalid route takes me to the page not found component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <App/>
    </MemoryRouter>
  )

	expect(wrapper.find(Home)).toHaveLength(0);
	expect(wrapper.find(PageNotFound)).toHaveLength(1)
})

test('valid route takes me to valid component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  )

	expect(wrapper.find(Home)).toHaveLength(1);
	expect(wrapper.find(PageNotFound)).toHaveLength(0)
})
