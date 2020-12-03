import React, { useState } from 'react'
import './MainBody.css';

import { entries } from "./entries.js";
import Entry from './Entry.js'
import NewEntry from './NewEntry.js'

import { useStateValue } from './StateProvider.js'
import Scroller from './Scroller.js'
import { db } from './firebase.js'


function MainBody(){
  // constructor(){
  //   super()
  //   this.state = {
  //     entries: entries,
  //     localEntriesArray: [],
  //     makeNewNote: false
  //   }
  // }
  const [{user, chapters}, dispatch] = useStateValue();
  const [entrees, setEntrees] = useState(entries)
  const [makeNewNote, setMakeNewNote] = useState(false)
  const [emptySection, setEmptySection] = useState([{title: '', content:''}])
  const [bookTitle, setBookTitle] = useState('New Notebook')
  const [isBookTitleSet, setIsBookTitleSet] = useState(false)

  const makeNewEntry = (e) => {
    dispatch({
      type: 'ADD_CHAPTER',
      item:{
        title: 'New Subject',
        bodies: [
          {
            title: 'New Section',
            content: 'Click to change '
                
          }
        ]
      }
    })
  }

  const makeNotebookTitle = (e) =>{
      e.preventDefault()
      setIsBookTitleSet(true)
  }

  const saveTheBook = (e) => {
      e.preventDefault();

      db.collection('testuser').doc(bookTitle).set({
          bookTitle,
          chapters: chapters 
      })

  }

    return (
      <div className="mainbody">
        <div className="mainbody__title">
        {
                isBookTitleSet 
                ?
                <div
                    onClick={e => {setIsBookTitleSet(false)}}
                >
                    {bookTitle}
                </div>
                :
                <form>
                <input 
                    placeholder="Enter Title"
                    value={bookTitle}
                    onChange={e => {setBookTitle(e.target.value)}}
                />
                <button
                    type='submit'
                    onClick={makeNotebookTitle}
                >
                    Set Title
                </button>
                </form>
            }
        </div>
        <div className="mainbody__main">
            <div className="mainbody__entries">
            <Scroller>
                
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
                <div className="mainbody_newEntry">
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
            </Scroller>
            </div>
            <div className="mainbody__options">
                <button
                    //onClick={e => {setMakeNewNote(true)}}
                    style={{height:'50px'}}
                    onClick={makeNewEntry}
                >
                    New Entry
                </button>
                <button
                    style={{marginTop: '50px'}}
                    onClick={saveTheBook}
                >
                    Save Book
                </button>

        </div>
        </div>
      </div>
    );
  
}

export default MainBody;
