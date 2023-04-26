import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Navbar from './Navbar';
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Meetings from './pages/Meetings/Meetings';
import Employees from './pages/Employees/Employees';
import ClientDetail from './pages/Clients/ClientDetail';
import MeetingDetail from './pages/Meetings/MeetingDetail';

import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import store from "../src/store";

function App() {

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [userType, setUserType] = useState(localStorage.getItem("userType") || "");

  const handleLogin = (userName: string, userType: string) => {
    setName(userName)
    setUserType(userType)
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar name={name} userType={userType} />
          <div className="app-content">
            <Switch>
              <PublicRoute exact path="/" component={Home} method={handleLogin} />
              <PrivateRoute exact path="/clients" component={Clients} />
              <PrivateRoute exact path="/meetings" component={Meetings} />
              <PrivateRoute exact path="/clients/:id" component={ClientDetail} />
              <PrivateRoute exact path="/meetings/:id" component={MeetingDetail} />
              <PrivateRoute exact path="/employees" component={Employees} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
