import React, { Component, Fragment } from "react"
import "./Substitution.css"

const removeDuplicates = arr => {
	var seen = {}
	var retArr = []
	for (var i = 0; i < arr.length; i++) {
		if (!(arr[i] in seen)) {
			retArr.push(arr[i])
			seen[arr[i]] = true
		}
	}
	return retArr.join("")
}
const normalise = words => {
	return removeDuplicates(words.toLowerCase().replace(/[^a-z]/g, ""))
}

const alphabet = "abcdefghijklmnopqrstuvwxyz"

class Substitution extends Component {
	constructor(props) {
		super(props)
		this.state = {
			plain: "",
			cipher: "",
			secret: "",
			mode: "encrypt"
		}
	}

	encrypt = (secret, plain) => {
		const ciphertext = normalise(secret + alphabet)
		const fullAlphabet = alphabet + alphabet.toUpperCase()
		const fullCiphertext = ciphertext + ciphertext.toUpperCase()
		return plain
			.split("")
			.map(x =>
				fullAlphabet.indexOf(x) > -1
					? fullCiphertext[fullAlphabet.indexOf(x)]
					: x
			)
			.join("")
	}

	decrypt = (secret, cipher) => {
		const ciphertext = normalise(secret + alphabet)
		const fullAlphabet = alphabet + alphabet.toUpperCase()
		const fullCiphertext = ciphertext + ciphertext.toUpperCase()
		return cipher
			.split("")
			.map(x =>
				fullCiphertext.indexOf(x) > -1
					? fullAlphabet[fullCiphertext.indexOf(x)]
					: x
			)
			.join("")
	}

	crack = (plain, cipher) => {
		const plainMessage = normalise(plain)
		const cipherMessage = normalise(cipher)
		return alphabet
			.split("")
			.map(x =>
				plainMessage.indexOf(x) > -1
					? cipherMessage[plainMessage.indexOf(x)]
					: "_"
			)
			.join("")
	}

	plainTextChange = event => {
		if (this.state.mode === "encrypt") {
			this.setState({
				plain: event.target.value,
				cipher: this.encrypt(this.state.secret, event.target.value)
			})
		}
		if (this.state.mode === "crack") {
			this.setState({
				plain: event.target.value,
				secret: this.crack(event.target.value, this.state.cipher)
			})
		}
	}
	cipherTextChange = event => {
		if (this.state.mode === "decrypt") {
			this.setState({
				plain: this.decrypt(this.state.secret, event.target.value),
				cipher: event.target.value
			})
		}
		if (this.state.mode === "crack") {
			this.setState({
				secret: this.crack(this.state.plain, event.target.value),
				cipher: event.target.value
			})
		}
	}
	secretTextChange = event => {
		if (this.state.mode === "encrypt") {
			this.setState({
				secret: event.target.value,
				cipher: this.encrypt(event.target.value, this.state.plain)
			})
		}
		if (this.state.mode === "decrypt") {
			this.setState({
				secret: event.target.value,
				plain: this.decrypt(event.target.value, this.state.cipher)
			})
		}
	}
	handleOptionChange = event => {
		this.setState({
			mode: event.target.value
		})
	}

	render() {
		return (
			<Fragment>
				<h2>Substitution cipher</h2>
				<blockquote cite="https://en.wikipedia.org/wiki/Substitution_cipher">
					<p>
						In{" "}
						<a
							href="https://en.wikipedia.org/wiki/Cryptography"
							title="Cryptography"
						>
							cryptography
						</a>
						, a <b>substitution cipher</b> is a method of{" "}
						<a
							href="https://en.wikipedia.org/wiki/Encrypting"
							title="Encrypting"
						>
							encrypting
						</a>{" "}
						by which units of{" "}
						<a href="https://en.wikipedia.org/wiki/Plaintext" title="Plaintext">
							plaintext
						</a>{" "}
						are replaced with{" "}
						<a
							href="https://en.wikipedia.org/wiki/Ciphertext"
							title="Ciphertext"
						>
							ciphertext
						</a>
						, according to a fixed system; the "units" may be single letters
						(the most common), pairs of letters, triplets of letters, mixtures
						of the above, and so forth. The receiver deciphers the text by
						performing the inverse substitution. -- wikipedia
					</p>
				</blockquote>

				<div className="row">
					<label htmlFor="mode">What would you like to do?</label>
					<select
						onChange={this.handleOptionChange}
						value={this.state.mode}
						id="mode"
					>
						<option value="encrypt">Encrypt</option>
						<option value="decrypt">Decrypt</option>
						<option value="crack">Crack</option>
					</select>
				</div>

				<div className="row">
					<label htmlFor="secret">Secret key: </label>
					<input
						className="u-full-width"
						id="secret"
						type="text"
						readOnly={this.state.mode === "crack"}
						onChange={this.secretTextChange}
						value={this.state.secret}
					/>
				</div>
				<div className="row">
					{" "}
					<label htmlFor="plain">Decrypted message: </label>
					<textarea
						className="u-full-width"
						type="textarea"
						id="plain"
						readOnly={this.state.mode === "decrypt"}
						onChange={this.plainTextChange}
						value={this.state.plain}
					/>
				</div>
				<div className="row">
					{" "}
					<label htmlFor="cipher">Encrypted message: </label>
					<textarea
						className="u-full-width"
						type="textarea"
						id="cipher"
						readOnly={this.state.mode === "encrypt"}
						onChange={this.cipherTextChange}
						value={this.state.cipher}
					/>
				</div>
			</Fragment>
		)
	}
}
export default Substitution
