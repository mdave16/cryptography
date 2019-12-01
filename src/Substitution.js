import React, { Component } from "react";

const removeDuplicates = (arr) => {
	    var seen = {};
	    var retArr = [];
	    for (var i = 0; i < arr.length; i++) {
	        if (!(arr[i] in seen)) {
	            retArr.push(arr[i]);
	            seen[arr[i]] = true;
	        }
	    }
	    return retArr.join('');
}
const alphabet = "abcdefghijklmnopqrstuvwxyz"

class Substitution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plain: "",
      cipher: "",
      secret: "",
			encrypt: 'encrypt'
    }
  }

	encrypt = (secret, plain) => {
		const ciphertext = removeDuplicates(secret + alphabet).replace(/\s/g, '')
		const fullAlphabet = alphabet + alphabet.toUpperCase()
		const fullCiphertext = ciphertext + ciphertext.toUpperCase()
		return plain.split('').map(x => fullAlphabet.indexOf(x) > -1 ? fullCiphertext[fullAlphabet.indexOf(x)] : x).join('')
	}

	decrypt = (secret, cipher) => {
		const ciphertext = removeDuplicates(secret + alphabet).replace(/\s/g, '')
		const fullAlphabet = alphabet + alphabet.toUpperCase()
		const fullCiphertext = ciphertext + ciphertext.toUpperCase()
		return cipher.split('').map(x => fullCiphertext.indexOf(x) > -1 ? fullAlphabet[fullCiphertext.indexOf(x)] : x).join('')
	}

	crack = (plain, cipher) => {
		const plainMessage = removeDuplicates(plain.toLowerCase().replace(/[^a-z]/g, ''))
		const cipherMessage = removeDuplicates(cipher.toLowerCase().replace(/[^a-z]/g, ''))
		return alphabet.split('').map(x => plainMessage.indexOf(x) > -1 ? cipherMessage[plainMessage.indexOf(x)] : '_').join('')

	}

  plainTextChange = event => {
		if(this.state.encrypt === 'encrypt') {
			this.setState({
	      plain: event.target.value,
				cipher: this.encrypt(this.state.secret, event.target.value)
	    })
		}
		if(this.state.encrypt === 'crack') {
			this.setState({
				plain: event.target.value,
				secret: this.crack(event.target.value, this.state.cipher)
			})
		}
  }
  cipherTextChange = event => {
		if(this.state.encrypt === 'decrypt') {
			this.setState({
				plain: this.decrypt(this.state.secret, event.target.value),
	      cipher: event.target.value
	    })
		}
		if(this.state.encrypt === 'crack') {
			this.setState({
				secret: this.crack(this.state.plain, event.target.value),
	      cipher: event.target.value
	    })
    }
  }
  secretTextChange = event => {
		if(this.state.encrypt === 'encrypt') {
			this.setState({
        secret: event.target.value,
				cipher: this.encrypt(event.target.value, this.state.plain)
      })
	  }
		if(this.state.encrypt === 'decrypt') {
			this.setState({
        secret: event.target.value,
				plain: this.decrypt(event.target.value, this.state.cipher)
      })
	  }
  }
  handleOptionChange = event => {
    this.setState({
      encrypt: event.target.value
    })
  }

  render() {
    return (
      <form>
        <label>
          <input
            type="radio"
            name="encrypt"
            value="encrypt"
            checked={this.state.encrypt === 'encrypt'}
            onChange={this.handleOptionChange}
          />
          Encrypt
        </label>
        <label>
          <input
            type="radio"
            name="encrypt"
            value="decrypt"
            checked={this.state.encrypt === 'decrypt'}
            onChange={this.handleOptionChange}
          />
          Decrypt
        </label>
				<label>
					<input
						type="radio"
						name="encrypt"
						value="crack"
						checked={this.state.encrypt === 'crack'}
						onChange={this.handleOptionChange}
					/>
					Crack
				</label>
        <p>Secret key: </p>
        <input type="text" disabled={this.state.encrypt === 'crack'} onChange={this.secretTextChange} value={this.state.secret} />
        <p>Decrypted message: </p>
        <input type="text" disabled={this.state.encrypt === 'decrypt'} onChange={this.plainTextChange}
				value={this.state.plain} />
        <p>Encrypted message: </p>
        <input type="text" disabled={this.state.encrypt === 'encrypt'} onChange={this.cipherTextChange}
				value={this.state.cipher} />
      </form>
    );
  }
}
export default Substitution;
