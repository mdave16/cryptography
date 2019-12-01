import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home'
import About from './About'
import Users from './Users'
import PageNotFound from './PageNotFound'

class App extends Component {
  render() {
    return (
			<Router basename="/cryptography">
	      <div>
	        <nav>
	          <ul>
	            <li>
	              <Link to="/">Home</Link>
	            </li>
	            <li>
	              <Link to="/about/">About</Link>
	            </li>
	            <li>
	              <Link to="/users/">Users</Link>
	            </li>
	          </ul>
	        </nav>
	      </div>
				<Switch>
				  <Route path="/" exact component={Home} />
				  <Route path="/about/" component={About} />
				  <Route path="/users/" component={Users} />
					<Route component={PageNotFound} />
				</Switch>
	    </Router>
    );
  }
}

export default App;
