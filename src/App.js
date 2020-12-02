import React, { useState } from 'react'
import './App.css';

import { entries } from "./entries.js";
import Entry from './Entry.js'
import NewEntry from './NewEntry.js'

import { useStateValue } from './StateProvider.js'



function App(){
  // constructor(){
  //   super()
  //   this.state = {
  //     entries: entries,
  //     localEntriesArray: [],
  //     makeNewNote: false
  //   }
  // }
  const [{chapters}, dispatch] = useStateValue();
  const [entrees, setEntrees] = useState(entries)
  const [makeNewNote, setMakeNewNote] = useState(false)

  
    return (
      <div className="app">
        <div className="app__entries">
          {chapters.map(entry => {
            return<>
              
              <Entry 
                title = {entry.title}
                content = {entry.bodies}
                key={Math.random()}
              />

              <br />
            </>
          })}
          {
            makeNewNote
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
            onClick={e => {setMakeNewNote(true)}}
          >
            New Note
          </button>

        </div>
        
      </div>
    );
  
}

export default App;
