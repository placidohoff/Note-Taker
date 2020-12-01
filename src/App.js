import React from 'react'
import './App.css';

import { entries } from "./entries.js";
import Entry from './Entry.js'
import NewEntry from './NewEntry.js'




class App extends React.Component{
  constructor(){
    super()
    this.state = {
      entries: entries,
      localEntriesArray: [],
      makeNewNote: false
    }
  }

  newNote(){
    
  }
  
  render(){
    return (
      <div className="app">
        <div className="app__entries">
          {this.state.entries.map(entry => {
            return<>
              
              <Entry 
                title = {entry.title}
                content = {entry.bodies}
              />

              <br />
            </>
          })}
          {
            this.state.makeNewNote
              ?
              <div className="app_newEntry">
                <NewEntry 
                
                />
              </div>
              :
              <></>
          }
        </div>
        <div className="app__options">
          <button
            onClick={e => {this.setState({makeNewNote:true})}}
          >
            New Note
          </button>

        </div>
        
      </div>
    );
  }
}

export default App;
