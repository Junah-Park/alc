import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import AddDrink from './components/alc/AddDrink.js';
import Drinks from './components/alc/Drinks.js';

import uuid from 'uuid';
import axios from 'axios';

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {

  state = {
    drinks: [],
    page: 0
  }

  // Toggle Complete
  markShelved = id => {
    this.setState({
      drinks: this.state.drinks.map(drink => {
        if (drink.id === id) {
          drink.completed = !drink.completed;
        }
        return drink;
      })
    });
  };

  // Delete drink
  deldrink = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/drinks/${id}`).then(res =>
      this.setState({
        drinks: [...this.state.drinks.filter(drink => drink.id !== id)]
      })
    );
  };    

  // Add drink
  addDrink = (drinkName, ingredients) => {
    axios
    .post(window.location.href+'/drinks/', { 
      name: drinkName,
      ingredients: ["vodka"],
      image: "images/flask.png"
    })
    .then(res => {
      console.log('then error');
      this.setState({ drinks: [...this.state.drinks, res.data] });
    })
    .catch(err => {
      console.log(err);
    });
  };

  render() {  
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/"            
              render={props => (
                <React.Fragment >
                    <AddDrink addDrink={this.addDrink} />
                    <Drinks
                      drinks={this.state.drinks}
                      markComplete={this.markComplete}
                      delDrink={this.delDrink}
                    />
                </React.Fragment>
              )} 
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
