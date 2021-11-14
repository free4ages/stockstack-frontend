import React, {useState,useRef,useCallback,useEffect} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import clsx from "clsx";
import {RootState} from 'app/store';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import { SpinnerInfinity } from 'spinners-react';
import Article from './article';

const useStyles = makeStyles((theme:Theme) => ({
  articleContainer:{
    overflowY:'scroll',
    height:'calc(100vh - 144px - 15px)',
    paddingLeft:24,
    paddingRight:24,
    marginTop:5
  },
  articleContainerShifted:{
    height:'calc(100vh - 144px - 15px - 48px)',
  },
}));

const useLoaderStyles = makeStyles((theme:Theme) => ({
  root: {
    width: '100%',
    height:30,
    textAlign: 'center'
  }
}));

interface OwnProps{
  searchOpen: boolean;
}

const mapState = (state: RootState) => ({
  articleIds: state.articles.articleIds,
});

const mapDispatch = {

};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const Loader = React.memo(({fetch}:any) => {
  console.log('rendering loader');
  const classes = useLoaderStyles();  
  const loader = useRef(null);
  const loadMore = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      fetch();
    }
  }, [fetch]);
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
      console.log('registering observer');  
      observer.observe(loader.current);
    }

    // clean up on willUnMount
    return () => {if(loader && loader.current){
      console.log('deregistering observer');  
    observer.unobserve(loader.current)}};
  }, [loader, loadMore]);

  return (
    <div ref={loader} className={classes.root}>
      <SpinnerInfinity /> 
    </div>
  );
});

const Articles = ({
  searchOpen,
  articleIds,
}:Props) => {
  const classes = useStyles();
  const fetch = useCallback(()=> console.log('fetch called'),[]);
  return (
    <div className={clsx(classes.articleContainer,{[classes.articleContainerShifted]:searchOpen})}>
      <div style={{padding:'16px 16px 24px 16px',marginBottom:'10px',backgroundColor:'#fff',border:'1px solid #dfe1e5'}}>
        <Skeleton height={34}/>
        <Skeleton height={24}/>
        <Skeleton height={24} width={300}/>
      </div>
      {articleIds.map(articleId => 
        <Article key={articleId} articleId={articleId}/>
      )}
      <Loader fetch={fetch} />
    </div>
  );
}
export default connector(Articles);
