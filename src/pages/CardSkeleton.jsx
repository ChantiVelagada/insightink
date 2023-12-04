import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CardSkeleton({cards}) {
  return (
    Array(cards).fill(0).map((item, i) => <div className='post-container' key={i}>
    <h1 ><Skeleton /></h1>
    <p><Skeleton count={4} /></p>
    <div className='post-info'>
        <div className='author-info'>
            <div className='user-profile'><Skeleton circle width={30} height={30}/></div>
            <p className='user-name'><Skeleton /></p>
        </div>

        <div className='skeleton-btn'><Skeleton height={30}/></div>
    </div>
</div>)
  )
}

export default CardSkeleton;