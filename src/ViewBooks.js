import React, { useState, useEffect } from 'react'
import './ViewBooks.css'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import { db } from './firebase.js'
import Header from './Header'


function ViewBooks(){

    const [{user, chapters}, dispatch] = useStateValue();
    const [username, setUsername] = useState(user.split('@'))
    const [collection, setCollection] = useState([])
    
    const history = useHistory();

    const confirmDelete = (title) => {
        let answer = window.confirm("Are you sure you want to permanetly delete this book of notes?");
        if (answer) {
            try{
                db.collection(username[0]).doc(title).delete()
                    console.log("Document successfully deleted!");
                }catch {
                    console.log("Error removing document: ");
                }
        }
        else {
            //Do Nothing
        }
        
    }

    const makeNewNote = (e) => {
        dispatch({
            type: 'LOAD_BOOK',
            item: {
                chapters: [
                    {
                        title: 'First Subject',
                        bodies: [
                            {
                                title: 'Click to change the title',
                                content: 'Click to change the content',
                                isMinimized: false
                            
                            }
                        ]
                    }
                ],
                bookTitle: 'New Book'
            }
        })
        history.push('/makenotes')
    }

    const makeNewTesting = (e) => {
        dispatch({
            type: 'LOAD_BOOK',
            item: {
                chapters: [
                    {
                        title: 'First Chapter',
                        isMinimized: false,
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
                ],
                bookTitle: 'New Book'
            }
        })
        history.push('/makenotes')
    }

    useEffect(() => {
        if(user == '' || user == undefined){
            history.push('/login')
        }
            
        else{
            //setCollection(db.collection('testuser'))
            db.collection(user)
            //.orderBy("timestamp", "asc")
            .onSnapshot(snapshot => {
                
                setCollection(snapshot.docs.map(doc =>(
                        {
                            
                            bookTitle: doc.data().bookTitle,
                            chapters: doc.data().chapters

                        }
                )))
            
            })
        }
        
    }, [])

    return(
        <div className="viewbooks">
            <div>Here is a collection of your notes:</div>
            {/* {console.log(collection)} */}
            {
                collection.length > 0 
                ?
                    //console.log(collection)
                    collection.map(book => {
                        if(book){
                            return(
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >
                                <div 
                                    key={Math.random()}
                                    className="viewbooks__collection"
                                    onClick={e => {
                                        dispatch({
                                            type: 'LOAD_BOOK',
                                            item: {
                                                chapters: book.chapters,
                                                bookTitle: book.bookTitle
                                            }
                                        })
                                        history.push('/makenotes')
                                    }}    
                                    style={{cursor:'default'}}
                                >
                                    {book.bookTitle}
                                </div>
                                <div
                                    className="viewbooks__delete"
                                    onClick={e => {confirmDelete(book.bookTitle)}}
                                >
                                    X
                                </div>
                            </div>
                            )
                        }
                    })
                :
                <div className="viewbooks__message">
                    There are 0 notes saved in your collection
                </div>
            }

            <button
                className="viewbooks__button"
                onClick={makeNewTesting}
            >
                Create New Note
            </button>

            {/* <button
                className="viewbooks__button"
                onClick={makeNewTesting}
            >
                Create New Testing
            </button> */}
        </div>
    )
}

export default ViewBooks;