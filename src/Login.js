import React, {useState} from 'react'
import './Login.css'
import { auth } from './firebase.js'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider.js'



function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [{user, chapters}, dispatch] = useStateValue();
    const history = useHistory();
    

    const loginUser = (e) => {
        e.preventDefault();

        if(email == '' || password == ''){
            setUserError(true)
            setErrorMessage('Please fill out both fields')
        }
        else{
            auth
            .signInWithEmailAndPassword(email, password)
            //'auth' is returnedS onSuccess:
            .then(auth => { 
                dispatch({
                    type: 'SET_USER',
                    item: {
                        user: email
                    }
                })
                history.push('/');
            })
            .catch(
                error =>{ 
                    //alert(error.message)
                    setUserError(true)
                    setErrorMessage("The login was unsuccessful")
                }
            )
        }
    }

    const createUser = (e) => {
        e.preventDefault();

        if(email == '' || password == ''){
            setUserError(true)
            setErrorMessage('Please fill out both fields')
        }
        else{
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //.then() is called after a successful .createUserWit.....(). We log to see it.
            console.log(auth)

            //if successful, redirect to home.
            if(auth){
                dispatch({
                    type: 'SET_USER',
                    item: {
                        user: email
                    }
                })
                history.push('/')
            }
        })
        .catch(
            error => {
                //alert(error.message)
                console.log(error)
                setUserError(true)
                setErrorMessage(error.message)
            }
            
        )
        }
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
                <br />
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
            {
                userError
                ?
                <div className="login__error">Error: {errorMessage} </div>
                :
                <></>
            }
            <div className="login__bottom">
                <p>*No need to use your actual email address. Treat it as a username to login to this specific application</p>
            </div>
        </div>
    )
}

export default Login