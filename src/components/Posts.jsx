import { Link } from 'react-router-dom';
import styles from './Posts.module.css';

function Posts( { title, content}) {

  return (
    <>
        <div className={styles.postContainer}>
            <Link to={`/posts/${title}`}><h2>{title }</h2></Link>
            <p>{content.substring(0,200)}.....</p>
            <Link to={`/posts/${title}`}><span className={styles.readMore}>Read more</span></Link>
        </div>
    </>
  )
}

export default Posts