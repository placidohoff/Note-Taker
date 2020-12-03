import React, {useState} from 'react'
import './Login.css'
import { auth } from './firebase.js'
import { useHistory } from 'react-router-dom'



function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const loginUser = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        //'auth' is returnedS onSuccess:
        .then(auth => {
            history.push('/');
        })
        .catch(
            error => alert(error.message)
        )
    }

    const createUser = (e) => {
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //.then() is called after a successful .createUserWit.....(). We log to see it.
            console.log(auth)

            //if successful, redirect to home.
            if(auth){
                history.push('/')
            }
        })
        .catch(
            error => {
                alert(error.message)
                console.log(error)
            }
            
        )
    }

    return(
        <div className="login">
            <form>
                <h5>Email</h5>
                <input 
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    type="text"
                />
                <br />
                <h5>Password</h5>
                <input 
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    type="password"
                />
                <button
                    type="submit"
                    onClick={loginUser}
                >
                    Login
                </button>
                <button
                    type="submit"
                    onClick={createUser}
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default Login