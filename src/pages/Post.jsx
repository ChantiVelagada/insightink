import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { getDocs , collection } from 'firebase/firestore'
import { db } from '../config/firebase-config'

function Post() {

  const [posts,setPosts] = useState([]);
  const { article } = useParams()

  const postsRef = collection(db , 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getPosts()
  },[])


  const post = posts.find((post => post.title === article))

  console.log(post)

  return (
    <>
      <div>
        <h1 style={{fontSize:'50px'}}>{post?.title}</h1>
        <Markdown>
          {post?.content}
        </Markdown>
      </div>
    </>
  )
}

export default Post
