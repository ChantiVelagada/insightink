import styles from './Home.module.css';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';
import CardSkeleton from '../components/UI/PostsSkeleton';
import { useQuery } from 'react-query';
import Posts from '../components/Posts';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ isLoggedIn }) {

  const [selectedPosts, setSelectedPosts] = useState(localStorage.getItem('showPosts'));
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const postsRef = collection(db, 'posts');

  async function getPosts() {
    try {
      const data = await getDocs(postsRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return posts;
    } catch (error) {
      return "Error fetching posts:" + error;
    }
  }

  const { data: posts, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  let content;

  if (isLoading) {
    content = <CardSkeleton cards={5} />
  }

  if (isError) {
    content = <div>Error fetching data : {error} </div>
  }

  if (posts) {
    let filteredPosts = [...posts];

    if (selectedPosts === 'Your') {
      filteredPosts = posts.filter((post) => post.author.id === auth.currentUser.uid)
    }

    if (searchText.trim() !== '') {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    localStorage.setItem('showPosts', selectedPosts)

    if (filteredPosts.length === 0) {
      content = (
        <div className={styles.noPosts}>
          <p>No matches found for "{searchText}"</p>
          <Link to={'/newpost'}>Create New Post</Link>
        </div>
      )
    } else {
      content = (
        filteredPosts.map((post) => (
          <Posts key={post.id} title={post.title} description={post.description} />
        ))
      )
    }
  }

  return (
    <>
      <div className={styles.flexContainer}>
        <select onChange={(event) => setSelectedPosts(event.target.value)} value={selectedPosts} className={styles.selectBox}>
          <option value="All">All Posts</option>
          <option value="Your">Your Posts</option>
        </select>

        <input onChange={(event) => setSearchText(event.target.value)} value={searchText} className={styles.input} type='text' placeholder='Search posts...' />
      </div>
      {content}
    </>
  )
}

export default Home;
