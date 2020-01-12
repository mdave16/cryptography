import React, { Component, Fragment } from "react"
import { Route, Link, Switch } from "react-router-dom"
import Home from "./Home"
import Substitution from "./Substitution"
import PageNotFound from "./PageNotFound"

class App extends Component {
	render() {
		return (
			<Fragment>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="">Home</Link>
							</li>
							<li>
								<Link to="/substitution">Substitution ciphers</Link>
							</li>
						</ul>
					</nav>
				</div>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/substitution" component={Substitution} />
					<Route component={PageNotFound} />
				</Switch>
			</Fragment>
		)
	}
}

export default App
