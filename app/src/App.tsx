import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Employees from './pages/Employees/Employees';

import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  

import store from "../src/store";

function App() {

  const[name,setName]= useState(localStorage.getItem("name") || "");
  const[userType, setUserType] = useState(localStorage.getItem("userType") || "");

  const handleLogin = (userName:string, userType:string) => {
      setName(userName)
      setUserType(userType)
  } 

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        <Navbar name= {name} userType={userType}/>
          <div className="app-content">
            <Switch>
              <Route exact path="/">
                <Home method={handleLogin}/>
              </Route>
              <Route exact path="/clients">
                <Clients />
              </Route>
              <Route exact path="/employees">
                <Employees />
              </Route>
              
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
