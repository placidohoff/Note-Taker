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
  const [emptySection, setEmptySection] = useState([{title: '', content:''}])
  
  const makeNewEntry = (e) => {
    dispatch({
      type: 'ADD_CHAPTER',
      item:{
        title: 'New Subject',
        bodies: [
          {
            title: 'New Section',
            content: 'afasf afasfas asfasf afas fas afasf'
                
          }
        ]
      }
    })
  }

    return (
      <div className="app">
        <div className="app__entries">
          {chapters.map((entry, index) => {
            return<>
              
              <NewEntry  
                isSet={true}
                title = {entry.title}
                sections = {entry.bodies}
                key={Math.random()}
                entryIndex={index}
              />

              <br />
            </>
          })}
          {
            makeNewNote
              ?
              <div className="app_newEntry">
                <NewEntry 
                  isSet={false}
                  title = ''
                  sections = {emptySection}
                  key={Math.random()}
                />
              </div>
              :
              <></>
          }
        </div>
        <div className="app__options">
          <button
            //onClick={e => {setMakeNewNote(true)}}
            onClick={makeNewEntry}
          >
            New Entry
          </button>

        </div>
        
      </div>
    );
  
}

export default App;
