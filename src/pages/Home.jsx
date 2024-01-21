import React, { useEffect, useState } from 'react';
import './Home.css';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../config/firebase-config';
import CardSkeleton from './CardSkeleton';
import { Link } from 'react-router-dom';

function Home({isLoggedIn}) {
  const [posts,setPosts] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const postsRef = collection(db , 'posts');


  useEffect(() => {

    const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      setIsLoading(false)
    }

    getPosts()
  },[posts])

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
  }

  return (
    <>
      <input className='search-input' type='text' placeholder='Search posts...' />
      {isLoading && <CardSkeleton cards={3} />}
      {posts.map((post) =>{
        return (
          <div className='post-container'>
            <Link to={`/posts/${post.title}`}><h2>{ post.title }</h2></Link>
            <p>{post.content.substring(0,200)}.....</p>
            <Link to={`/posts/${post.title}`}><span className='read-more'>Read more</span></Link>
            <div className='post-info'>
              <div className='author-info'>
                <img className='user-profile' src={post.author?.imgUrl} />
                <p>{post.author?.name}</p>
              </div>
              
              {isLoggedIn && post.author.id === auth.currentUser?.uid && (
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
        )
      })}
    </>
  )
}

export default Home