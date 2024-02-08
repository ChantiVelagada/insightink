import React, { useEffect, useState } from 'react';
import styles from './NewPost.module.css';
import { addDoc , collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import { useNavigate } from 'react-router-dom';



function NewPost({isLoggedIn}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()

  const postsRef = collection(db , 'posts');

  async function createPost() {
    try {
      await addDoc(postsRef, {
        title,
        description,
        content,
        date: new Date().toDateString(),
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          imgUrl: auth.currentUser.photoURL
        }
      });
      navigate('/');
    } catch (error) {
      return "Error creating post:", error;
    }
  }
  

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/login')
    }
  }, [])

  return (
    <div className={styles.postForm}>

      <svg  onClick={() => navigate('../')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style={{fill:"#232326"}} d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left"/></svg>

      <label>Title </label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Give a Title.' required autoFocus/>

      <label>Description </label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Brief desscription in two to three lines about the topic.' rows={3} required/>


      <label>Content </label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content goes here... supports "Markdown".' rows={20} required/>

      <div className={styles.formBtns}>
        <button onClick={() => navigate('../')} className={styles.cancel}>Cancel</button>
        <button className={styles.post} onClick={createPost}>Post</button>
      </div>
    </div>
  )
}

export default NewPost;
