import Skeleton from '@material-ui/lab/Skeleton';
import React, {useState,useRef,useCallback,useEffect} from 'react';
const ListPlaceHolder = React.memo(() =>{
  const indexes = [0,1,2,3,4];
  return (
  <>
    {indexes.map(index=>(
      <div key={index} style={{padding:'16px 16px 24px 16px',marginBottom:'10px',backgroundColor:'#fff',border:'1px solid #dfe1e5'}}>
        <Skeleton height={34}/>
        <Skeleton height={24}/>
        <Skeleton height={24} width={300}/>
      </div>
    ))}
  </>
  );
});

export default ListPlaceHolder;
