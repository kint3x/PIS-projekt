import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Navbar from './Navbar';
import LoginForm from './pages/Home/LoginForm';
import Clients from './pages/Clients/Clients';
import Me from './pages/Me/Me';
import Employees from './pages/Employees/Employees';
import Products from './pages/Products/Products';

import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import store from "../src/store";
import Meetings from './pages/Meetings/Meetings';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <div className="app-content">
            <Switch>
              <PublicRoute exact path="/" component={LoginForm}/>
              <PrivateRoute exact path="/clients" component={Clients} allowedUsers="worker,manager,owner"/>
              <PrivateRoute exact path="/products" component={Products} allowedUsers="owner"/>
              <PrivateRoute exact path="/employees" component={Employees} allowedUsers="manager,owner"/>
              <PrivateRoute exact path="/meetings" component={Meetings} allowedUsers="worker,owner"/>
              <PrivateRoute exact path="/me" component={Me} allowedUsers="worker,owner,manager"/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
