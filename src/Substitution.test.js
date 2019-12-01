import React from 'react';
import { mount } from 'enzyme';
import Substitution from './Substitution';

describe('substitution cipher', () => {

	describe('has encrypt and decrypt and crack mode', () => {
		const wrapper = mount(<Substitution/>)
		it('is initially in encrypt mode', () => {
			expect(wrapper.state('encrypt')).toEqual('encrypt')

			expect(wrapper.find('input').at(3).prop('disabled')).toEqual(false)
			expect(wrapper.find('input').at(4).prop('disabled')).toEqual(false)
			expect(wrapper.find('input').at(5).prop('disabled')).toEqual(true)
		})
		it('can be set to decrypt mode', () => {
		  wrapper.find('input').at(1).simulate('change', { target: { value: "decrypt" }})
		  expect(wrapper.state('encrypt')).toEqual('decrypt')

			expect(wrapper.find('input').at(3).prop('disabled')).toEqual(false)
			expect(wrapper.find('input').at(4).prop('disabled')).toEqual(true)
			expect(wrapper.find('input').at(5).prop('disabled')).toEqual(false)
	  })
		it('can be set to crack mode', () => {
		  wrapper.find('input').at(2).simulate('change', { target: { value: "crack" }})
		  expect(wrapper.state('encrypt')).toEqual('crack')

			expect(wrapper.find('input').at(3).prop('disabled')).toEqual(true)
			expect(wrapper.find('input').at(4).prop('disabled')).toEqual(false)
			expect(wrapper.find('input').at(5).prop('disabled')).toEqual(false)
		})
	})

	describe('encryption', () => {
		it('encrypts usng a substitution cipher', () => {
			const wrapper = mount(<Substitution/>)
			wrapper.find('input').at(3).simulate('change', { target: { value: "zebras" }})
			wrapper.find('input').at(4).simulate('change', { target: { value: "Handles punctuation and case!" }})

			expect(wrapper.state('secret')).toEqual('zebras')
			expect(wrapper.state('plain')).toEqual('Handles punctuation and case!')
			expect(wrapper.state('cipher')).toEqual('Dzkriap mtkbqtzqflk zkr bzpa!')
		})

		it('encrypts if given in other order', () => {
			const wrapper = mount(<Substitution/>)
			wrapper.find('input').at(4).simulate('change', { target: { value: "Handles punctuation and case!" }})
			wrapper.find('input').at(3).simulate('change', { target: { value: "zebras" }})

			expect(wrapper.state('secret')).toEqual('zebras')
			expect(wrapper.state('plain')).toEqual('Handles punctuation and case!')
			expect(wrapper.state('cipher')).toEqual('Dzkriap mtkbqtzqflk zkr bzpa!')
		})
	})

	describe('decryption', () => {
		it('decrypts usng a substitution cipher', () => {
			const wrapper = mount(<Substitution/>)
			wrapper.find('input').at(1).simulate('change', { target: { value: "decrypt" }})
			wrapper.find('input').at(3).simulate('change', { target: { value: "zebras" }})
			wrapper.find('input').at(5).simulate('change', { target: { value: "Dzkriap mtkbqtzqflk zkr bzpa!" }})

			expect(wrapper.state('secret')).toEqual('zebras')
			expect(wrapper.state('plain')).toEqual('Handles punctuation and case!')
			expect(wrapper.state('cipher')).toEqual('Dzkriap mtkbqtzqflk zkr bzpa!')
		})

		it('decrypts if given in other order', () => {
			const wrapper = mount(<Substitution/>)
			wrapper.find('input').at(1).simulate('change', { target: { value: "decrypt" }})
			wrapper.find('input').at(5).simulate('change', { target: { value: "Dzkriap mtkbqtzqflk zkr bzpa!" }})
			wrapper.find('input').at(3).simulate('change', { target: { value: "zebras" }})


			expect(wrapper.state('secret')).toEqual('zebras')
			expect(wrapper.state('plain')).toEqual('Handles punctuation and case!')
			expect(wrapper.state('cipher')).toEqual('Dzkriap mtkbqtzqflk zkr bzpa!')
		})
	})

	describe('cracking', () => {
		it('cracks the secret given the input and output', () => {
			const wrapper = mount(<Substitution/>)
			wrapper.find('input').at(1).simulate('change', { target: { value: "crack" }})
			wrapper.find('input').at(4).simulate('change', { target: { value: "Handles punctuation and case!" }})
			wrapper.find('input').at(5).simulate('change', { target: { value: "Dzkriap mtkbqtzqflk zkr bzpa!" }})

			expect(wrapper.state('secret')).toEqual('z_bra__df__i_klm__pqt_____')
			expect(wrapper.state('plain')).toEqual('Handles punctuation and case!')
			expect(wrapper.state('cipher')).toEqual('Dzkriap mtkbqtzqflk zkr bzpa!')
		})

		it('cracks the secret given in other order', () => {
			const wrapper = mount(<Substitution/>)
			wrapper.find('input').at(1).simulate('change', { target: { value: "crack" }})
			wrapper.find('input').at(5).simulate('change', { target: { value: "Dzkriap mtkbqtzqflk zkr bzpa!" }})
			wrapper.find('input').at(4).simulate('change', { target: { value: "Handles punctuation and case!" }})


			expect(wrapper.state('secret')).toEqual('z_bra__df__i_klm__pqt_____')
			expect(wrapper.state('plain')).toEqual('Handles punctuation and case!')
			expect(wrapper.state('cipher')).toEqual('Dzkriap mtkbqtzqflk zkr bzpa!')
		})
	})
})
