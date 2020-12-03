import React, { useState, useEffect } from 'react'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'

function ViewBooks(){

    const [{user, chapters}, dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        if(user == ''){
            history.push('/login')
        }
            
        else{
            //alert('no')
        // console.log(user)
        // console.log(chapters)
        }
        
    }, [])

    return(
        <div className="viewbooks">
            <div>Hello</div>
        </div>
    )
}

export default ViewBooks;