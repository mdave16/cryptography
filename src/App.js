import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home'
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
	            </li>
	          </ul>
	        </nav>
	      </div>
				<Switch>
				  <Route path="/" exact component={Home} />
					<Route component={PageNotFound} />
				</Switch>
	    </Router>
    );
  }
}

export default App;
