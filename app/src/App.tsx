import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import Meetings from './pages/Meetings/Meetings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import ClientDetail from './pages/ClientDetail/ClientDetail';
import MeetingDetail from './pages/MeetingDetail/MeetingDetail';
import CustomersDepartment from './pages/CustomersDepartment';
import Manager from './pages/Manager';
import {useState, useEffect} from 'react'

function App() {

  const[name,setName]= useState(localStorage.getItem("name") || "");
  const[userType, setUserType] = useState(localStorage.getItem("userType") || "");

  const handleLogin = (userName:string, userType:string) => {
      setName(userName)
      setUserType(userType)
      console.log(userName)
      console.log(userType)
  } 

  return (
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
            <Route exact path="/meetings">
              <Meetings />
            </Route>
            <Route exact path="/clients/:id">
              <ClientDetail />
            </Route>
            <Route exact path="/meetings/:id">
              <MeetingDetail />
            </Route>
            <Route exact path="/manager">
              <Manager />
            </Route>
            <Route exact path="/customers-department">
              <CustomersDepartment />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
