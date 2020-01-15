import React from "react"
import { mount } from "enzyme"
import RailFence from "./RailFence"

const change = (inputElt, text) => {
	inputElt.simulate("change", { target: { value: text } })
}

describe("Rail Fence cipher", () => {
	let wrapper = mount(<RailFence />)
	const secretKey = () => wrapper.find("input").at(0)
	const plainMessage = () => wrapper.find("textarea").at(0)
	const encodedMessage = () => wrapper.find("textarea").at(1)
	const mode = () => wrapper.find("select").at(0)

	beforeEach(() => {
		wrapper = mount(<RailFence />)
	})

	describe("has encrypt and decrypt mode", () => {
		it("is initially in encrypt mode", () => {
			expect(wrapper.state("mode")).toEqual("encrypt")
			expect(plainMessage().prop("readOnly")).toEqual(false)
			expect(encodedMessage().prop("readOnly")).toEqual(true)
		})

		it("can be set to decrypt mode", () => {
			change(mode(), "decrypt")

			expect(wrapper.state("mode")).toEqual("decrypt")
			expect(plainMessage().prop("readOnly")).toEqual(true)
			expect(encodedMessage().prop("readOnly")).toEqual(false)
		})
	})

	describe("cleaning input", () => {
		describe("secretKey", () => {
			it("initially has a key of 3", () => {
				expect(wrapper.state("secret")).toEqual(3)
			})

			it("negative input leads to default", () => {
				change(secretKey(), -1)
				expect(wrapper.state("secret")).toEqual(3)
			})

			it("zero input leads to default", () => {
				change(secretKey(), 0)
				expect(wrapper.state("secret")).toEqual(3)
			})
		})
	})

	describe("encryption", () => {
		it("does nothing if the key is 1", () => {
			change(plainMessage(), "Handles punctuation!")
			change(secretKey(), 1)

			expect(wrapper.state("secret")).toEqual(1)
			expect(wrapper.state("plain")).toEqual("Handles punctuation!")
			expect(wrapper.state("cipher")).toEqual("Handles punctuation!")
		})

		it("calculates encryption if the key is bigger", () => {
			change(plainMessage(), "Handles punctuation!")
			change(secretKey(), 3)

			expect(wrapper.state("secret")).toEqual(3)
			expect(wrapper.state("plain")).toEqual("Handles punctuation!")
			expect(wrapper.state("cipher")).toEqual("Hlptiade ucuto!nsnan")
		})

		it("encrypts if given in other order", () => {
			change(secretKey(), 3)
			change(plainMessage(), "Handles punctuation!")

			expect(wrapper.state("secret")).toEqual(3)
			expect(wrapper.state("plain")).toEqual("Handles punctuation!")
			expect(wrapper.state("cipher")).toEqual("Hlptiade ucuto!nsnan")
		})
	})

	describe("decryption", () => {
		it("does nothing if the key is 1", () => {
			change(mode(), "decrypt")
			change(encodedMessage(), "Handles punctuation!")
			change(secretKey(), 1)

			expect(wrapper.state("secret")).toEqual(1)
			expect(wrapper.state("plain")).toEqual("Handles punctuation!")
			expect(wrapper.state("cipher")).toEqual("Handles punctuation!")
		})

		it("calculates decryption if the key is bigger", () => {
			change(mode(), "decrypt")

			change(encodedMessage(), "Hlptiade ucuto!nsnan")

			expect(wrapper.state("secret")).toEqual(3)
			expect(wrapper.state("plain")).toEqual("Handles punctuation!")
			expect(wrapper.state("cipher")).toEqual("Hlptiade ucuto!nsnan")

			change(secretKey(), 4)

			expect(wrapper.state("secret")).toEqual(4)
			expect(wrapper.state("plain")).toEqual("Hiuntaldoa!ep nnsutc")
			expect(wrapper.state("cipher")).toEqual("Hlptiade ucuto!nsnan")
		})
	})
})
