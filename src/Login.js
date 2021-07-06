import React, {useState} from 'react'
import './Login.css'
import { auth, provider } from './firebase.js'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider.js'
import firebase from 'firebase'
// import { facebookProvider, githubProvider, googleProvider } from './config/authMethods'
//import socialMediaAuth from './service/auth'



function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [{user, chapters}, dispatch] = useStateValue();
    const history = useHistory();
    
    const handleOnClick = () => {
        //const res = await socialMediaAuth(provider);
        //onsole.log(res);
        //let provider = new firebase.auth().GoogleAuthProvider()
        auth
        .signInWithPopup(provider)
        .then(res=> {
            //let data = res
            //console.log(res.user.email)
            dispatch({
                type: 'SET_USER',
                item: {
                    user: res.user.email
                }
            })
            history.push('/books')
        })
        .catch(e => {
            console.log(e)
        }

        )

    };

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
                history.push('/books');
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
                history.push('/books')
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
            <div className="login__logo">Notebook Online</div>
            
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '-20px'
                    }}
                >
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
                
                    <br />
                    
                    <button
                        onClick={e => handleOnClick()}
                        style={{
                            backgroundColor: '#BF953F'
                        }}
                    >
                        Sign-in With Google
                    </button>
                </div>
            </form>
            
            {
                userError
                ?
                <div className="login__error">Error: {errorMessage} </div>
                :
                <></>
            }
            <div className="login__bottom">
                <p>*You do not need to use an actual email address. But use the same credentials to log-in again and see the notes you saved for that email</p>
            </div>
        </div>
    )
}

export default Login