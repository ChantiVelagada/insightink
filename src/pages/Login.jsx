import React from 'react';
import styles from './Login.module.css';
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
      <button onClick={() => navigate('../')} className={styles.backArrow}>back</button>
      {!isLoggedIn ? ( 
        <div className={styles.loginLogout}>
        <button
          onClick={signInWithInGoogle} 
          type="button" 
          className={styles.loginWithGoogleBtn} 
        >
          Sign in with Google
        </button>
        </div>):(
        <div className={styles.profilePage}>
          <img className={styles.profileImage} src={auth.currentUser.photoURL} />
          <h3>{auth.currentUser?.displayName}</h3>
          <p>{auth.currentUser.email}</p>
          <button onClick={signOutFromGoogle} className={styles.red}>
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
