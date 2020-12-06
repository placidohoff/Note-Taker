import React, { useState } from 'react'
import './MainBody.css';

import { entries } from "./entries.js";
import Entry from './Entry.js'
import NewEntry from './NewEntry.js'

import { useStateValue } from './StateProvider.js'
import Scroller from './Scroller.js'
import { db } from './firebase.js'
import { useHistory } from 'react-router-dom'



function MainBody(){
  // constructor(){
  //   super()
  //   this.state = {
  //     entries: entries,
  //     localEntriesArray: [],
  //     makeNewNote: false
  //   }
  // }
  const [{user, chapters, bookTitle }, dispatch] = useStateValue();
  const [username, setUsername] = useState(user.split('@'))
  const [entrees, setEntrees] = useState(entries)
  const [makeNewNote, setMakeNewNote] = useState(false)
  const [emptySection, setEmptySection] = useState([{title: '', content:''}])
  const [newTitle, setNewTitle] = useState(bookTitle)
  const [isBookTitleSet, setIsBookTitleSet] = useState(true)
  const history = useHistory();

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

      db.collection(username[0]).doc(bookTitle).set({
          bookTitle,
          chapters: chapters 
      })

  }

    return (
      <div className="mainbody">

       <div> 
        <div className="mainbody__titleContainer">
        <div 
            className="mainbody__title"
            
            >
        {
                isBookTitleSet 
                ?
                <>
                <div
                    onClick={e => {setIsBookTitleSet(false)}}
                    style={{}}
                >
                    {newTitle}
                </div>
                
                
            
                </>
                :
                <form>
                <input 
                    placeholder="Enter Title"
                    value={newTitle}
                    onChange={e => {setNewTitle(e.target.value)}}
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
        </div>
        <div className="mainbody__hamurgerContainer">
        <button 
            class="mainbody__hamburger"
            onClick={e => {
                let navbar = document.querySelector('.mainbody__navbar')
                let ham = document.querySelector('.mainbody__hamburger')

                navbar.classList.toggle("mainbody__showNavAnimate")
                ham.classList.toggle("mainbody__hamburgerClose")

            }}
            ></button>
            <nav class="mainbody__navbar">
                <ul style={{marginTop:'60px'}}>
                <li style={{marginTop:'20px'}}><a class="menuLink" href="#">Home</a></li>
                <li><a class="menuLink" href="#">Profile</a></li>
                <li><a class="menuLink" href="#">About</a></li>
                <li><a class="menuLink" href="#">Contacts</a></li>
                </ul>
            </nav>
        </div>
        <div 
                className="mainbody__options"
                // style={{float:'right', marginTop:'-40px', position:'relative'}}
                //  style={{marginLeft:'500px', position:'fixed', marginTop:'-50px'}}
                 >
                <button
                    //onClick={e => {setMakeNewNote(true)}}
                    onClick={makeNewEntry}
                    style={{float:'left'}}
                >
                    New Entry
                </button>

                
                <button
                    
                    onClick={saveTheBook}
                >
                    Save Book
                </button>

                <button
                    //onClick={e => {setMakeNewNote(true)}}
                    
                    onClick={e => {history.push('/')}}
                >
                    Exit 
                </button>
                

            </div>
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
                    chapterIndex={index}
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
            <div
                className='mainbody__newEntryButton'
            >
                <button

                    onClick={makeNewEntry}
                    className="mainbody__addNewButton"
                >
                New Entry
                </button>
            </div>
            </Scroller>
            </div>
            
        </div>
      </div>
    );
  
}

export default MainBody;
