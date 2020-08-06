import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/Home'; //Home component
import Read from './components/Read'; //Read component


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/employee-api-frontent-" component={Home} /> 
          <Route path="/read/:id" component={Read} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;