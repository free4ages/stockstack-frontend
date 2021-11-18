import React, {useRef,useCallback,useEffect} from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { SpinnerInfinity } from 'spinners-react';
import { useInView } from 'react-intersection-observer';

const useLoaderStyles = makeStyles((theme:Theme) => ({
  root: {
    width: '100%',
    height:30,
    textAlign: 'center'
  }
}));
const LoadMore = React.memo(({setLoadMore,show=true}:any) => {
  console.log('rendering loader');
  const classes = useLoaderStyles();  
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  useEffect(()=>{
    setLoadMore(inView);
  },[inView]);

  return (
    <div style={show?{}:{display:'none'}} ref={ref} className={classes.root}>
      <SpinnerInfinity /> 
    </div>
  );
});

export default LoadMore;
