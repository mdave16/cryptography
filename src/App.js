import React, { Component, Fragment } from "react"
import { Route, Switch } from "react-router-dom"
import Home from "./Home"
import NavigationBar from "./NavigationBar"
import Substitution from "./Substitution"
import PageNotFound from "./PageNotFound"

class App extends Component {
	render() {
		return (
			<Fragment>
				<NavigationBar />
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
