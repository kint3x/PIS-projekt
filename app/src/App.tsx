import React from 'react';
import './App.css';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Meetings from './pages/Clients';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Navbar';
import ClientDetail from './pages/ClientDetail';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
