import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer'
import store from './store';
import { Provider } from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProductPage from './components/Product/ProductPage';
import ProductItem from './components/Product/ProductItem';
import AdminItem from './components/Admin/Product/Product';
import PrivateRoute from './components/common/PrivateRoute';


import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage/Hompage';
import { setCurrentUser, logoutUser } from './action/authActions';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';

// Check for token
if (localStorage.jwtToken) {
  // Set Auth token
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className='content'>
          <NavBar />
          <div className="content-container">
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/product" component={ProductPage} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/product/:id" component={ProductItem} />
              <Route exact path="/product/admin/:id" component={AdminItem} />
              
              <Switch>
                <PrivateRoute exact path="/admin" component={Admin} />
              </Switch>
          </div>
          <Footer />
        </div>
      </Router> 
      </Provider>
    );
  }
}

export default App;



