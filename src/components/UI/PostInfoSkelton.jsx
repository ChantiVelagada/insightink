import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function PostInfoSkelton({cards}) {
  return (
    Array(cards).fill(0).map((item, i) => <div className='post-container' key={i}>
    <h1><Skeleton height={'50px'}/></h1>
    <span><Skeleton width={'100px'} /></span>
    <p><Skeleton height={'60vh'}/></p>
    </div>)
  )
}

export default PostInfoSkelton