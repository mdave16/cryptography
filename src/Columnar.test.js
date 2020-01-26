import React from "react"
import { mount } from "enzyme"
import Columnar from "./Columnar"

const change = (inputElt, text) => {
	inputElt.simulate("change", { target: { value: text } })
}

describe("Columnar Transposition cipher", () => {
	let wrapper = mount(<Columnar />)
	const secretKey = () => wrapper.find("input").at(0)
	const plainMessage = () => wrapper.find("textarea").at(0)
	const encodedMessage = () => wrapper.find("textarea").at(1)
	const mode = () => wrapper.find("select").at(0)

	beforeEach(() => {
		wrapper = mount(<Columnar />)
	})

	describe("has encrypt mode", () => {
		it("is initially in encrypt mode", () => {
			expect(wrapper.state("mode")).toEqual("encrypt")
			expect(plainMessage().prop("readOnly")).toBeFalsy()
			expect(secretKey().prop("readOnly")).toBeFalsy()
			expect(encodedMessage().prop("readOnly")).toEqual(true)
		})
	})

	describe("cleaning input", () => {
		describe("secretKey", () => {
			it("will remove spaces from secret key", () => {
				change(secretKey(), "   ")
				expect(wrapper.state("secret")).toEqual("")
			})
		})
	})

	describe("encryption", () => {
		it("will do nothing if the secret is empty", () => {
			change(plainMessage(), "Handles punctuation!")
			change(secretKey(), "")

			expect(wrapper.state("secret")).toEqual("")
			expect(wrapper.state("plain")).toEqual("Handles punctuation!")
			expect(wrapper.state("cipher")).toEqual("Handles punctuation!")
		})

		it("will do nothing if the secret is one letter long", () => {
			change(plainMessage(), "Handles punctuation!")
			change(secretKey(), "a")

			expect(wrapper.state("secret")).toEqual("a")
			expect(wrapper.state("plain")).toEqual("Handles punctuation!")
			expect(wrapper.state("cipher")).toEqual("Handles punctuation!")
		})

		it("will produce columns if the secret is longer and in alphabetical order and plaintext is correct size", () => {
			change(plainMessage(), "Hello!")
			change(secretKey(), "ab")

			expect(wrapper.state("secret")).toEqual("ab")
			expect(wrapper.state("plain")).toEqual("Hello!")
			expect(wrapper.state("cipher")).toEqual("Hloel!")
		})

		it("will produce columns if the secret is longer and not in alphabetical order and plaintext is correct size", () => {
			change(plainMessage(), "Hello!")
			change(secretKey(), "ba")

			expect(wrapper.state("secret")).toEqual("ba")
			expect(wrapper.state("plain")).toEqual("Hello!")
			expect(wrapper.state("cipher")).toEqual("el!Hlo")
		})

		it("will append random letters if message is wrong size", () => {
			change(plainMessage(), "Hello")
			change(secretKey(), "cab")

			expect(wrapper.state("secret")).toEqual("cab")
			expect(wrapper.state("plain")).toEqual("Hello")
			expect(wrapper.state("cipher")).toMatch(/eol.Hl/)
		})

		it("handles punctuation and spaces", () => {
			change(plainMessage(), "handles punctuation and spaces!")
			change(secretKey(), "cab")

			expect(wrapper.state("secret")).toEqual("cab")
			expect(wrapper.state("plain")).toEqual("handles punctuation and spaces!")
			expect(wrapper.state("cipher")).toMatch(
				/al nui dpe.nepcaoa as.hdsuttnnsc!/
			)
		})
	})
})
