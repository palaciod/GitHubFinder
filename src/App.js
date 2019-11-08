import React from "react";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";
import "./App.css";
import About from "./components/pages/About";
import User from "./components/users/User";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <React.Fragment>
                    <Users />
                  </React.Fragment>
                )}
              ></Route>
              <Route exact path='/about' component={About}></Route>
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.callBackFunction}
                    user={this.users}
                    loading={this.callBackFunction}
                  ></User>
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
