import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import Home from './Home'
import About from './About'
import Users from './Users'
import PageNotFound from './PageNotFound'

test('random shows page not found error', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <App/>
    </MemoryRouter>
  )

	expect(wrapper.find(Home)).toHaveLength(0);
	expect(wrapper.find(About)).toHaveLength(0);
	expect(wrapper.find(Users)).toHaveLength(0);
	expect(wrapper.find(PageNotFound)).toHaveLength(1)
})

test('/ goes to Home', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  )

	expect(wrapper.find(Home)).toHaveLength(1);
	expect(wrapper.find(About)).toHaveLength(0);
	expect(wrapper.find(Users)).toHaveLength(0);
	expect(wrapper.find(PageNotFound)).toHaveLength(0)
})

test('/about goes to About', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/about' ]}>
      <App/>
    </MemoryRouter>
  )

	expect(wrapper.find(Home)).toHaveLength(0);
	expect(wrapper.find(About)).toHaveLength(1);
	expect(wrapper.find(Users)).toHaveLength(0);
	expect(wrapper.find(PageNotFound)).toHaveLength(0);
})

test('/users goes to Users', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/users' ]}>
      <App/>
    </MemoryRouter>
  )

	expect(wrapper.find(Home)).toHaveLength(0);
	expect(wrapper.find(About)).toHaveLength(0);
	expect(wrapper.find(Users)).toHaveLength(1);
	expect(wrapper.find(PageNotFound)).toHaveLength(0);
})
