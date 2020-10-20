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
import Footer from "./components/layout/Footer";

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

  constructor(props) {
    super(props);

    this.state = {
      drinks: [],
      page: 0
    };

    axios.get('/api/drinks/')
    .then(res => {
        this.setState({ drinks: res.data });
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Toggle Shelved
  markShelved = id => {
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
    axios.delete(`/api/drinks/${id}`).then(res =>
      this.setState({
        drinks: [...this.state.drinks.filter(drink => drink.id !== id)]
      })
    )
    .catch(err => {
      console.log(err);
    });
  };    

  // Add drink
  addDrink = (drinkName, drinkIngredients) => {
    const drinkId = uuidv4();
    axios
    .post('/api/drinks/', { 
      id: drinkId,
      name: drinkName,
      ingredients: drinkIngredients,
      image: "images/flask.png"
    })
    .then(res => {
      this.setState({ drinks: [ res.data, ...this.state.drinks] });
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
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
