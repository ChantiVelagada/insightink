import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CardSkeleton({cards}) {
  return (
    Array(cards).fill(0).map((item, i) => <div className='post-container' key={i}>
    <h1 ><Skeleton /></h1>
    <p><Skeleton count={3} /></p>
    <span><Skeleton width={'100px'} /></span>
    </div>)
  )
}

export default CardSkeleton;