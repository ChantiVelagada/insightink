import Markdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../config/firebase-config';
import styles from './Post.module.css';
import { useQuery } from 'react-query';
import PostInfoSkelton from '../components/UI/PostInfoSkelton';
import remarkGfm from 'remark-gfm'

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

  const { data : post, isLoading } = useQuery({
    queryKey : ['posts', {article}],
    queryFn : getPosts,
  })

  async function deletePost(id) {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
    navigate('/')
  }

  let content

  if(isLoading) {
    content = <PostInfoSkelton cards={1} />
  }

  if(post) {
    content =(
      <div className={styles.articleInfo}>
        <h1 className={styles.heading}>{post?.title}</h1>
        <p className={styles.date}>{post?.date} <span style={{textDecoration:'underline'}}>{post?.author?.name}</span></p>
        <Markdown remarkPlugins={[remarkGfm]}>
          {post?.content}
        </Markdown>
      </div>
    )
  }

  return (
    <>
      <div className={styles.postNavigation}>
        <svg  onClick={() => navigate('../')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style={{fill:"#232326"}} d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left"/></svg>

        {isLoggedIn && post?.author.id === auth?.currentUser?.uid && (
          <div className={styles.dataButtons}>
            <Link>Edit</Link>
            <Link onClick={() => deletePost(post?.id)}>Delete</Link>
          </div>
        )}
      </div>
      {content}
    </>
  )
}

export default Post
