import React, { Component, Fragment } from "react"
import "./main.css"

const mod = (a, b) => ((a % b) + b) % b
const zigzagmod = (a, b) => Math.min(mod(a, 2 * b - 2), mod(-a, 2 * b - 2))
const copies_of = (length, item) => Array.from({ length: length }, () => item)

class RailFence extends Component {
	constructor(props) {
		super(props)
		this.state = {
			plain: "",
			cipher: "",
			secret: 3,
			mode: "encrypt"
		}
	}

	encrypt = (secret, plain) => {
		if (secret === 1) {
			return plain
		}
		return plain
			.replace(/ /g, "")
			.split("")
			.reduce((a, x, i) => {
				a[zigzagmod(i, secret)] += x
				return a
			}, copies_of(secret, ""))
			.reduce((a, b) => a + b, "")
	}

	decrypt = (secret, cipher) => {
		if (secret === 1) {
			return cipher
		}
		const blocks = cipher
			.split("")
			.reduce((v, a, i) => {
				v[zigzagmod(i, secret)]++
				return v
			}, copies_of(secret, 0))
			.reduce((ac, c, i) => {
				ac[i] = {
					start: i == 0 ? 0 : ac[i - 1]["start"] + ac[i - 1]["len"],
					len: c
				}
				return ac
			}, [])
			.map((a, i) => cipher.substr(a["start"], a["len"]).split(""))

		return cipher
			.split("")
			.reduce((w, a, i) => (w += blocks[zigzagmod(i, secret)].shift()), "")
	}

	plainTextChange = event => {
		if (this.state.mode === "encrypt") {
			this.setState({
				plain: event.target.value,
				cipher: this.encrypt(this.state.secret, event.target.value)
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
	}
	secretTextChange = event => {
		const secret = event.target.value > 0 ? event.target.value : 3
		if (this.state.mode === "encrypt") {
			this.setState({
				secret: secret,
				cipher: this.encrypt(secret, this.state.plain)
			})
		}
		if (this.state.mode === "decrypt") {
			this.setState({
				secret: secret,
				plain: this.decrypt(secret, this.state.cipher)
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
				<h2>Rail Fence Cipher</h2>
				<blockquote cite="https://en.wikipedia.org/wiki/Rail_fence_cipher">
					<p>
						{" "}
						The <strong>rail fence cipher</strong> (also called a{" "}
						<strong>zigzag cipher</strong>) is a form of{" "}
						<a
							href="https://en.wikipedia.org/wiki/Transposition_cipher"
							title="Transposition cipher"
						>
							transposition cipher
						</a>
						. It derives its name from the way in which it is encoded. --
						wikipedia
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
					</select>
				</div>

				<div className="row">
					<label htmlFor="secret">Secret key: </label>
					<input
						className="u-full-width"
						id="secret"
						type="number"
						pattern="[0-9]+"
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
export default RailFence
