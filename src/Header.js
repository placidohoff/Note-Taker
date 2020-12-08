import React, {useState} from 'react';
import './Header.css'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'

function Header(){
    const [{user}, dispatch] = useStateValue()
    const [username, setUsername] = useState(user.split('@'))
    
    const history = useHistory();

    return(
        <div className="header">
            <div style={{/*float: 'left'*/left:'5px', position: 'absolute'}}>Welcome <span className='header__username'>{username[0]}</span></div>
            <div 
                style={{
                    // float: 'right',
                    position:'absolute', 
                    right: '35px',
                    fontSize: 'small',
                    textDecoration: 'underline',
                    cursor: 'default'
                }}
                onClick={e => {
                    dispatch({
                        type: 'SIGN_OUT'
                    })
                    history.push('/login')
                }}
            >sign out</div>
        </div>
    )
}

export default Header;