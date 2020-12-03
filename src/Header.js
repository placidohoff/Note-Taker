import React, {useState} from 'react';
import './Header.css'
import { useStateValue } from './StateProvider.js'

function Header(){
    const [{user}, dispatch] = useStateValue()
    const [username, setUsername] = useState(user.split('@'))

    return(
        <div className="header">
            <div>Welcome <span className='header__username'>{username[0]}</span></div>
        </div>
    )
}

export default Header;