import React from 'react';
import './Login.css';
import { auth, provider} from '../config/firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

function Login({isLoggedIn,setIsLoggedIn}) {

  const navigate = useNavigate()

  const signInWithInGoogle = () => {
    signInWithPopup(auth , provider)
    .then((result) => {
      localStorage.setItem('isLoggedIn', true);
      setIsLoggedIn(true)
      navigate('/')
    })
  }

  const signOutFromGoogle = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate('/login')
    })
  }

  return (
    <>
      {!isLoggedIn ? (<div className='login-logout'>
        <button
          onClick={signInWithInGoogle} 
          type="button" 
          className="login-with-google-btn" 
        >
          Sign in with Google
        </button>
        </div>):(
        <div className='profile-page'>
          <img src={auth.currentUser.photoURL} />
          <h3>{auth.currentUser?.displayName}</h3>
          <p>{auth.currentUser.email}</p>
          <button onClick={signOutFromGoogle} className='red'>
              <span class="circle1"></span>
              <span class="circle2"></span>
              <span class="circle3"></span>
              <span class="circle4"></span>
              <span class="circle5"></span>
              <span class="text" >Logout</span>
          </button>
        </div>
      )}
    </>
  )
}

export default Login;
