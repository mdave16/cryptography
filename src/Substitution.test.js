import React from "react"
import { mount } from "enzyme"
import Substitution from "./Substitution"

const change = (inputElt, text) => {
	inputElt.simulate("change", { target: { value: text } })
}

describe("substitution cipher", () => {
	describe("has encrypt and decrypt and crack mode", () => {
		const wrapper = mount(<Substitution />)
		const secretKey = () => wrapper.find("input").at(0)
		const plainMessage = () => wrapper.find("textarea").at(0)
		const encodedMessage = () => wrapper.find("textarea").at(1)
		const mode = () => wrapper.find("select").at(0)

		it("is initially in encrypt mode", () => {
			expect(wrapper.state("mode")).toEqual("encrypt")
			expect(secretKey().prop("readOnly")).toEqual(false)
			expect(plainMessage().prop("readOnly")).toEqual(false)
			expect(encodedMessage().prop("readOnly")).toEqual(true)
		})

		it("can be set to decrypt mode", () => {
			change(mode(), "decrypt")

			expect(wrapper.state("mode")).toEqual("decrypt")
			expect(secretKey().prop("readOnly")).toEqual(false)
			expect(plainMessage().prop("readOnly")).toEqual(true)
			expect(encodedMessage().prop("readOnly")).toEqual(false)
		})

		it("can be set to crack mode", () => {
			change(mode(), "crack")

			expect(wrapper.state("mode")).toEqual("crack")
			expect(secretKey().prop("readOnly")).toEqual(true)
			expect(plainMessage().prop("readOnly")).toEqual(false)
			expect(encodedMessage().prop("readOnly")).toEqual(false)
		})
	})

	describe("encryption", () => {
		let wrapper = mount(<Substitution />)
		const secretKey = () => wrapper.find("input").at(0)
		const plainMessage = () => wrapper.find("textarea").at(0)

		it("encrypts usng a substitution cipher", () => {
			change(secretKey(), "zebras")
			change(plainMessage(), "Handles punctuation and case!")

			expect(wrapper.state("secret")).toEqual("zebras")
			expect(wrapper.state("plain")).toEqual("Handles punctuation and case!")
			expect(wrapper.state("cipher")).toEqual("Dzkriap mtkbqtzqflk zkr bzpa!")
		})

		it("encrypts if given in other order", () => {
			wrapper = mount(<Substitution />)
			change(plainMessage(), "Handles punctuation and case!")
			change(secretKey(), "zebras")

			expect(wrapper.state("secret")).toEqual("zebras")
			expect(wrapper.state("plain")).toEqual("Handles punctuation and case!")
			expect(wrapper.state("cipher")).toEqual("Dzkriap mtkbqtzqflk zkr bzpa!")
		})
	})

	describe("decryption", () => {
		let wrapper = mount(<Substitution />)
		const mode = () => wrapper.find("select").at(0)
		const secretKey = () => wrapper.find("input").at(0)
		const encodedMessage = () => wrapper.find("textarea").at(1)

		it("decrypts usng a substitution cipher", () => {
			change(mode(), "decrypt")
			change(secretKey(), "zebras")
			change(encodedMessage(), "Dzkriap mtkbqtzqflk zkr bzpa!")

			expect(wrapper.state("secret")).toEqual("zebras")
			expect(wrapper.state("plain")).toEqual("Handles punctuation and case!")
			expect(wrapper.state("cipher")).toEqual("Dzkriap mtkbqtzqflk zkr bzpa!")
		})

		it("decrypts if given in other order", () => {
			wrapper = mount(<Substitution />)
			change(mode(), "decrypt")
			change(encodedMessage(), "Dzkriap mtkbqtzqflk zkr bzpa!")
			change(secretKey(), "zebras")

			expect(wrapper.state("secret")).toEqual("zebras")
			expect(wrapper.state("plain")).toEqual("Handles punctuation and case!")
			expect(wrapper.state("cipher")).toEqual("Dzkriap mtkbqtzqflk zkr bzpa!")
		})
	})

	describe("cracking", () => {
		let wrapper = mount(<Substitution />)
		const mode = () => wrapper.find("select").at(0)
		const plainMessage = () => wrapper.find("textarea").at(0)
		const encodedMessage = () => wrapper.find("textarea").at(1)

		it("cracks the secret given the input and output", () => {
			change(mode(), "crack")
			change(plainMessage(), "Handles punctuation and case!")
			change(encodedMessage(), "Dzkriap mtkbqtzqflk zkr bzpa!")

			expect(wrapper.state("secret")).toEqual("z_bra__df__i_klm__pqt_____")
			expect(wrapper.state("plain")).toEqual("Handles punctuation and case!")
			expect(wrapper.state("cipher")).toEqual("Dzkriap mtkbqtzqflk zkr bzpa!")
		})

		it("cracks the secret given in other order", () => {
			wrapper = mount(<Substitution />)
			change(mode(), "crack")
			change(encodedMessage(), "Dzkriap mtkbqtzqflk zkr bzpa!")
			change(plainMessage(), "Handles punctuation and case!")

			expect(wrapper.state("secret")).toEqual("z_bra__df__i_klm__pqt_____")
			expect(wrapper.state("plain")).toEqual("Handles punctuation and case!")
			expect(wrapper.state("cipher")).toEqual("Dzkriap mtkbqtzqflk zkr bzpa!")
		})
	})
})
