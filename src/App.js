import React, { useState } from 'react'
import './App.css';

import { entries } from "./entries.js";
import Entry from './Entry.js'
import NewEntry from './NewEntry.js'

import { useStateValue } from './StateProvider.js'
import Header from './Header';
import MainBody from './MainBody';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './Login.js'
import ViewBooks from './ViewBooks.js'


function App(){

  const [{}, dispatch] = useStateValue();

  return(
  <Router>
    <div className="app">
      <Switch>
        
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/makenotes">
          <Header />
          <MainBody />
        </Route>

        <Route path="/">
          <ViewBooks />
        </Route>

        {/* <Route path="/">
          <Header />
          <MainBody />
        </Route> */}

      </Switch>
    </div>
  </Router>
  )
}

export default App;
