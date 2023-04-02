import React from 'react';
import './App.css';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Meetings from './pages/Meetings';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import ClientDetail from './pages/ClientDetail';
import MeetingDetail from './pages/MeetingDetail';
import CustomersDepartment from './pages/CustomersDepartment';
import Manager from './pages/Manager';
import {useState} from 'react'

function App() {

  const[name,setName]= useState(null);
  const[userType, setUserType] = useState(null);

  const handleLogin = (userName:any, userType:any) => {
      setName(userName)
      setUserType(userName)
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
            <Route exact path="/worker/clients">
              <Clients />
            </Route>
            <Route exact path="/worker/meetings">
              <Meetings />
            </Route>
            <Route exact path="/worker/clients/:id">
              <ClientDetail />
            </Route>
            <Route exact path="/worker/meetings/:id">
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
