import React, { useState, useEffect } from 'react'
import './MainBody.css';

import { entries } from "./entries.js";
import Entry from './Entry.js'
import NewEntry from './NewEntry.js'

import { useStateValue } from './StateProvider.js'
import Scroller from './Scroller.js'
import { db } from './firebase.js'
import { useHistory } from 'react-router-dom'
import MainBody from './MainBody.js'
import EntryBody from './EntryBody.js'
//import TestingBody from '.TestingBody.js'
import gsap from 'gsap';


function TestingBody(){
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
        type: 'ADD_NEW_ENTRY',
        item:{
            title: 'New Chapter',
            bodies: [
                {
                    content: '',
                    isMinimized: false,
                    subEntries: [
                        
                    ],
                    isSet: false
                    
                
                }
            ]
        }
    })
  }

  const makeNotebookTitle = (e) =>{
      e.preventDefault()
      setIsBookTitleSet(true)
      dispatch({
          type: 'SAVE_TITLE',
          item: {
              title: newTitle
          }

      })
  }

  const animate = (flag) => {
    if(flag == true){
        gsap.to('.saveSuccess', {
          display: 'inline',
          y: -10,
          duration: 1,
          yoyoEase:true,
          repeat:0,
          onComplete: animateOut
        })
      }
      else{
        gsap.to('.saveFail', {
          display: 'inline',
          y: -10,
          duration: 1,
          yoyoEase:true,
          repeat:0,
          onComplete: animateOut
        })
      }
  }

  const animateOut = () => {
    gsap.to('.saveSuccess', {
      display: 'none'
    })
    gsap.to('.saveFail', {
      display: 'none'
    })
  }

  const saveTheBook = (e) => {
      e.preventDefault();

      
      dispatch({
          type: 'SAVE_BOOK',
          item:{
            chapters: chapters,
            user: user
          }
      })
      try{db.collection(user).doc(bookTitle).set({
          bookTitle:bookTitle,
          chapters: chapters
      })
      animate(true)
    }
      catch(err){
        console.log(err)
        animate(false)
      }
    // animate(true)
  }

  useEffect(() => {
    if(user == '' || user == undefined){
        history.push('/')
    }
  },[])

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
                    className="mainbody__titleBox"
                    style={{
                        
                    }}
                />
                <button
                    type='submit'
                    onClick={makeNotebookTitle}
                    style={{
                        
                    }}
                    className="mainbody__setTitle"
                >
                    Set Title
                </button>
                </form>
            }
            
            </div>
        </div>
        <div className="mainbody__hamurgerContainer">
        <button 
            className="mainbody__hamburger"
            style={{}}
            onClick={e => {
                let navbar = document.querySelector('.mainbody__navbar')
                let ham = document.querySelector('.mainbody__hamburger')

                navbar.classList.toggle("mainbody__showNavAnimate")
                ham.classList.toggle("mainbody__hamburgerClose")

            }}
            ></button>
            <nav className="mainbody__navbar">
                <ul style={{}}>
                <li 
                    onClick={makeNewEntry}
                    className="navbar_first" style={{}}>New Entry</li>
                <li
                    onClick={saveTheBook}
                >Save Book</li>
                <li
                    onClick={e => {history.push('/')}}
                >Exit</li>
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
                        style={{
                            marginTop: '15px',
                            
                    
                        }}
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
                
                {/* <EntryBody 
                    isSet={true}
                    title = "test"
                    sections = {entry.bodies}
                    key={Math.random()}
                    entryIndex={index}
                    chapterIndex={index}
                    isMinimized={entry.isMinimized}
                /> */}

                <NewEntry  
                    isSet={true}
                    title = {entry.title}
                    sections = {entry.bodies}
                    key={Math.random()}
                    // entryIndex={index}
                    chapterIndex={index}
                    isMinimized={entry.isMinimized}
                    isTesting={true}
                    content={entry.bodies}
                />

                <br />
                </>
            })}
            <div
                className="saveBox"
                style={{
                    // border: '1px solid black',
                    // width: '100px',
                    // height: '100px',
                    position: 'absolute',
                    marginLeft: '40%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div
                    className="saveSuccess"
                    style={{
                        width: '100px',
                        backgroundColor: 'green',
                        textAlign: 'center',
                        height: '30px',
                        fontWeight: 'bold',
                        display: 'none'
                    }}
                >
                    Save Sucess
                </div>
                <div
                    className="saveFail"
                    style={{
                        width: '100px',
                        backgroundColor: 'red',
                        textAlign: 'center',
                        height: '30px',
                        fontWeight: 'bold',
                        display: 'none'
                    }}
                >
                    Save Failed
                </div>
            </div>

            <div
                className='mainbody__newEntryButton'
            >
                <button

                    // onClick={makeNewEntry}
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

export default TestingBody;
