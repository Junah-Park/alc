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

import {v4 as uuidv4} from 'uuid';
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

  // Toggle Shelved
  markShelved = id => {
    console.log("shelved runs");
    this.setState({
      drinks: this.state.drinks.map(drink => {
        if (drink.id === id) {
          drink.shelved = !drink.shelved;
        }
        return drink;
      })
    });
  };

  // Delete drink
  delDrink = id => {
    axios.delete(`http://localhost:5000/api/drinks/${id}`).then(res =>
      this.setState({
        drinks: [...this.state.drinks.filter(drink => drink.id !== id)]
      })
    );
  };    

  // Add drink
  addDrink = (drinkName, ingredients) => {
    const drinkId = uuidv4();
    axios
    .post('http://localhost:5000/api/drinks/', { 
      id: drinkId,
      name: drinkName,
      ingredients: ["vodka"],
      image: "images/flask.png"
    })
    .then(res => {
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
                      markShelved={this.markShelved}
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
