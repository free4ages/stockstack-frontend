import React, {useState,useRef,useCallback,useEffect} from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SpinnerInfinity } from 'spinners-react';

const useLoaderStyles = makeStyles((theme:Theme) => ({
  root: {
    width: '100%',
    height:30,
    textAlign: 'center'
  }
}));
const LoadMore = React.memo(({fetch,hasMore}:any) => {
  console.log('rendering loader');
  const classes = useLoaderStyles();  
  const loader = useRef(null);
  const loadMore = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      fetch();
    }
  }, [fetch,hasMore]);
  useEffect(() => {
    const options = {
        root: null, // window by default
        rootMargin: '0px',
        threshold: 0.25
    };

    // Create observer
    const observer = new IntersectionObserver(loadMore, options);

    // observer the loader
    if (loader && loader.current) {
      console.log('registering loading observer');  
      observer.observe(loader.current);
    }

    // clean up on willUnMount
    return () => {if(loader && loader.current){
      console.log('deregistering loading observer');  
    observer.unobserve(loader.current)}};
  }, [loader, loadMore]);

  return (
    <div ref={loader} className={classes.root}>
      {hasMore && (
        <SpinnerInfinity /> 
      )}
    </div>
  );
});

export default LoadMore;
