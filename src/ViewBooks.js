import React, { useState, useEffect } from 'react'
import './ViewBooks.css'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import { db } from './firebase.js'

function ViewBooks(){

    const [{user, chapters}, dispatch] = useStateValue();
    const [username, setUsername] = useState(user.split('@'))
    const [collection, setCollection] = useState([])
    
    const history = useHistory();

    const makeNewNote = (e) => {
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
            {
                collection.length > 0 
                ?
                    //console.log(collection)
                    collection.map(book => {
                        if(book){
                            return(
                            <div>{book.bookTitle}</div>
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