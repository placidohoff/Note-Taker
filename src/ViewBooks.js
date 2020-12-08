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

    const makeNewNote = (e) => {
        dispatch({
            type: 'LOAD_BOOK',
            item: {
                chapters: [
                    {
                        title: 'First Subject',
                        bodies: [
                            {
                                title: 'First Body',
                                content: 'afasf afasfas asfasf afas fas afasf'
                            
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
        if(user == ''){
            history.push('/login')
        }
            
        else{
            //setCollection(db.collection('testuser'))
            db.collection(username[0])
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
                onClick={makeNewNote}
            >
                Create New Note
            </button>
        </div>
    )
}

export default ViewBooks;