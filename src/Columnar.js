import React, { Component, Fragment } from "react"

class Columnar extends Component {
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
		const boxLength = secret.replace(/\s/g, "").length

		if (boxLength < 2) {
			return plain
		}

		const xtraCharsNeeded =
			((-plain.length % boxLength) + boxLength + boxLength) % boxLength

		return plain
			.split("")
			.concat(Array.from(Array(xtraCharsNeeded), () => "a"))
			.reduce(
				(acc, cur, idx) => {
					acc[idx % boxLength]["column"] += cur
					return acc
				},
				secret
					.replace(/\s/g, "")
					.split("")
					.map(x => ({ char: x, column: "" }))
			)
			.sort((x, y) => x["char"] > y["char"])
			.map(x => x["column"])
			.join("")
	}

	// decrypt = (secret, cipher) => {
	//
	// }

	plainTextChange = event => {
		// if (this.state.mode === "encrypt") {
		this.setState({
			plain: event.target.value,
			cipher: this.encrypt(this.state.secret, event.target.value)
		})
		// }
	}
	cipherTextChange = event => {
		// if (this.state.mode === "decrypt") {
		// 	this.setState({
		// 		plain: this.decrypt(this.state.secret, event.target.value),
		// 		cipher: event.target.value
		// 	})
		// }
	}
	secretChange = event => {
		const secret = event.target.value
		// if (this.state.mode === "encrypt") {
		this.setState({
			secret: secret.replace(/[^A-z]/g, ""),
			cipher: this.encrypt(secret, this.state.plain)
		})
		// }
		// if (this.state.mode === "decrypt") {
		// 	this.setState({
		// 		secret: secret,
		// 		plain: this.decrypt(secret, this.state.cipher)
		// 	})
		// }
	}
	handleOptionChange = event => {
		this.setState({
			mode: event.target.value
		})
	}

	render() {
		return (
			<Fragment>
				<h2>Columnar Transposition</h2>
				<blockquote cite="https://en.wikipedia.org/wiki/Transposition_cipher#Columnar_transposition">
					<p>
						In a{" "}
						<a
							href="https://en.wikipedia.org/wiki/Transposition_cipher#Columnar_transposition"
							title="Columnar Transposition"
						>
							columnar transposition
						</a>
						, the message is written out in rows of a fixed length, and then
						read out again column by column, and the columns are chosen in some
						scrambled order. Both the width of the rows and the permutation of
						the columns are usually defined by a keyword. -- wikipedia
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
					</select>
				</div>

				<div className="row">
					<label htmlFor="secret">
						Secrey key: (usually short word or phrase){" "}
					</label>
					<input
						className="u-full-width"
						id="secret"
						type="input"
						onChange={this.secretChange}
						value={this.state.secret}
					/>
				</div>
				<div className="row">
					<label htmlFor="plain">Decrypted message: </label>
					<textarea
						className="u-full-width"
						type="textarea"
						id="plain"
						onChange={this.plainTextChange}
						value={this.state.plain}
					/>
				</div>
				<div className="row">
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
export default Columnar
