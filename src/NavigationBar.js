import React from "react"
import { Link } from "react-router-dom"

const NavigationBar = () => (
	<nav className="row">
		<Link to="" className="one column">
			Home
		</Link>
		<Link to="/substitution" className="three columns">
			Substitution ciphers
		</Link>
	</nav>
)

export default NavigationBar
