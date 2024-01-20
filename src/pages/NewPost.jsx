import React, { useEffect, useState } from 'react';
import './NewPost.css';
import { addDoc , collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import { useNavigate } from 'react-router-dom';
import MEditor from "@uiw/react-md-editor";


function NewPost({isLoggedIn}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate()

  const postsRef = collection(db , 'posts');

  const createPost = async () => {
    await addDoc(postsRef, {title,content, author : {id : auth.currentUser.uid, name: auth.currentUser.displayName,
    imgUrl: auth.currentUser.photoURL}});
    navigate('/')
  }

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='post-form'>

      <label>Title </label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title...' />

      <label>Content </label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content goes here... supports "Markdown"' rows={20}/>

      <button onClick={createPost}>
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text" >Post</span>
      </button>
    </div>
  )
}

export default NewPost;
