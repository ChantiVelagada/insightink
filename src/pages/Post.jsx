import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { getDocs , collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'

function Post() {

  const [posts,setPosts] = useState([]);
  const { title } = useParams()

  const postsRef = collection(db , 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getPosts()
  },[])


  const post = posts.find((post => post.title === title))

  console.log(post)

  return (
    <Markdown>
      {post?.content}
    </Markdown>
  )
}

export default Post
