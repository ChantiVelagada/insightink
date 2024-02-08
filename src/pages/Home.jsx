import styles from './Home.module.css';
import {getDocs, collection} from 'firebase/firestore';
import {auth, db} from '../config/firebase-config';
import CardSkeleton from '../components/UI/PostsSkeleton';
import { useQuery } from 'react-query';
import Posts from '../components/Posts';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home({isLoggedIn}) {
  
  const [ selectedPosts, setSelectedPosts ]  = useState('All Posts');
  const [filteredPosts, setFilteredPosts] = useState([])
  const [ searchtext, setSearchText] = useState()

  const postsRef = collection(db , 'posts');

  async function getPosts() {
    try {
      const data = await getDocs(postsRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return posts;
    } catch (error) {
      return  "Error fetching posts:", error;
    }
  }
  
  const { data : posts, isLoading, isError, error, refetch} = useQuery({
    queryKey : ['posts'],
    queryFn : getPosts,
  })

  let content;

  if(isLoading) {
    content = <CardSkeleton cards={5} />
  }

  if(isError) {
    content = <div>Error fetching data : {error} </div>
  }

  if(posts) {

    let filteredPosts

    if(selectedPosts === 'Your') {
      filteredPosts = posts?.filter((post) => post?.author.id === auth.currentUser.uid)
    }else {
      filteredPosts = posts
    }

    if(filteredPosts?.length === 0) {
      content = (
        <div className={styles.noPosts}>
          <p >You have no posts</p>
          <Link to={'/newpost'}>Create New Post</Link>
        </div>
      )
    }else {
      content = (
        filteredPosts?.map((post) => (
          <Posts key={post.title} author={posts.author} id={post.id} isLoggedIn={isLoggedIn} title={post.title} description={post.description}/>
        ))
      )
    }
  }

  function handleSearch() {

  }

  return (
    <>
      <div className={styles.flexContainer}>
          <select onChange={(event) => setSelectedPosts(event.target.value)} value={selectedPosts} className={styles.selectBox}>
            <option value="All">All Posts</option>
            <option value="Your">Your Posts</option>
          </select>

        <input onChange={(event) => searchtext(event.target.value)} value={searchtext} className={styles.input} type='text' placeholder='Search posts...'/>
      </div>
      { content }
    </>
  )
}

export default Home