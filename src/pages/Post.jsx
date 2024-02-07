import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../config/firebase-config';
import styles from './Post.module.css';
import { useMutation, useQuery } from 'react-query';

function Post({isLoggedIn}) {

  const { article } = useParams()
  const navigate = useNavigate()

  const postsRef = collection(db , 'posts');

  async function getPosts() {
    const data = await getDocs(postsRef);
    const posts = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    const post = posts.find((post => post.title === article));

    return post;
  }

  const { data : post, isLoading, isError, error} = useQuery({
    queryKey : ['posts', {article}],
    queryFn : getPosts,
  })

  async function deletePost(id) {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
    navigate('/')
  }

  return (
    <>
      <button onClick={() => navigate('../')} className={styles.backArrow}> back</button>
      <div className={styles.articleInfo}>
        <h1 className={styles.heading}>{post?.title}</h1>
        <p className={styles.date}>{post?.date}</p>
        <Markdown>
          {post?.content}
        </Markdown>
        <div className={styles.postInfo}>
        <div className={styles.authorInfo}>
          <img className={styles.userProfile} src={post?.author?.imgUrl} />
          <p>{post?.author?.name}</p>
        </div>
        {isLoggedIn && post?.author.id === auth?.currentUser?.uid && (
          <button onClick={() => deletePost(post.id)}  className='red'>
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Delete</span>
          </button>
        )}
      </div>
      </div>
    </>
  )
}

export default Post
