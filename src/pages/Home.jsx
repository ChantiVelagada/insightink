import styles from './Home.module.css';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../config/firebase-config';
import CardSkeleton from './CardSkeleton';
import { useQuery } from 'react-query';
import Posts from '../components/Posts';
import { useState } from 'react';

function Home({isLoggedIn}) {

  const postsRef = collection(db , 'posts');

  async function getPosts()  {
    const data = await getDocs(postsRef);
    const posts = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

    return posts
  }
  
  const { data : posts, isLoading, isError, error} = useQuery({
    queryKey : ['posts'],
    queryFn : getPosts,
  })

  let content;

  if(isLoading) {
    content = <CardSkeleton cards={5} />
  }

  if(isError) {
    content = <div>Error fetching data</div>
  }

  if(posts) {
    content = (
      posts?.map((post) => (
        <Posts key={post.title} author={posts.author} id={post.id} isLoggedIn={isLoggedIn} title={post.title} content={post.content}/>
      ))
    )
  }

  function handleSearch() {

  }

  return (
    <>
      <input onChange={handleSearch} className={styles.searchInput} type='text' placeholder='Search posts...'/>
      { content }
    </>
  )
}

export default Home