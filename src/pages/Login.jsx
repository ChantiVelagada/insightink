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
      <svg  onClick={() => navigate('../')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style={{fill:"#232326"}} d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left"/></svg>
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
          <img className={styles.profileImage} src={auth.currentUser?.photoURL} />
          <h3>{auth.currentUser?.displayName}</h3>
          <p>{auth.currentUser?.email}</p>
          <button onClick={signOutFromGoogle} className={styles.red}>
              Logout
          </button>
        </div>
      )}
    </>
  )
}

export default Login;
