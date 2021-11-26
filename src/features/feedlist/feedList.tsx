import React, {useEffect,useState,useRef} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {Feeds,FeedListFilter} from './components';
import {doListFeeds,doMarkReadAuto,doMarkSeenAuto} from 'hooks/feed';

interface OwnProps{
}

const mapState = (state: RootState) => ({
  showLoadMore: !!(state.feeds.feedIds.length && state.feeds.moreToFetch),
  loading : !!state.feeds.loading,
  moreToFetch : !!state.feeds.moreToFetch,
});

const mapDispatch = (dispatch:AppDispatch) => ({
  listFeeds(){
    dispatch(doListFeeds())
  },
  loadMoreFeeds(){
    dispatch(doListFeeds({loadMore:true}));
  },
  autoMarkRead(feedId:string){
    dispatch(doMarkReadAuto(feedId));
  },
  autoMarkSeen(feedId:string){
    dispatch(doMarkSeenAuto(feedId));
  },
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const FeedList = ({
  listFeeds,
  loadMoreFeeds,
  showLoadMore,
  loading,
  moreToFetch,
  autoMarkRead,
  autoMarkSeen
}:Props) => {
  console.log("Rendering FeedList");
  const [searchOpen,setSearchOpen] = useState(false);
  const [everLoaded,setEverLoaded] = useState(false);
  const [loadMore,setLoadMore] = useState(false);
  const [seenRootMargin,setSeenRootMargin] = useState<number>((window.innerHeight>400)?window.innerHeight-400:0);
  const readObserver = useRef<any>(null);
  const seenObserver = useRef<any>(null);
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{ 
    if(!everLoaded){
      listFeeds();
      setEverLoaded(true);
    }
  },[everLoaded,listFeeds]);

  useEffect(()=>{
    if(loadMore && !loading && moreToFetch){
      loadMoreFeeds();
    }
  },[loadMore])

  useEffect(()=>{
    if(containerRef && containerRef.current){
      console.log(containerRef.current);
      console.log('initializing read observer');
      const observer = new IntersectionObserver(
        (entries,observer) => {
          entries.forEach(entry => {
            if(entry.target instanceof HTMLElement){
              const target = entry.target;
              const feedId = target?.dataset?.id;
              if(!feedId){
                observer.unobserve(target);
                return
              }
              console.log(entry.isIntersecting,entry.intersectionRatio,feedId);
              if(entry.intersectionRatio>0.5 || !(entry.intersectionRatio>0.1)){
                return;
              }

              const box = target.getBoundingClientRect();
              console.log(box.top);
              if(!(box.top>120)){ 
                const currentTop = box.top;
                console.log("currentTop",currentTop);
                //check if user is scrolling upwards;
                setTimeout(()=>{
                 const updatedBox = target.getBoundingClientRect();
                 console.log("updatedTop",updatedBox.top);
                 if(updatedBox.top>currentTop){
                  observer.observe(target);
                 }
                 else{
                  autoMarkRead(feedId);
                 }
                },500);
                //remove so no future futur event occurs
                observer.unobserve(target);
              }
            }
          });
        },
        { threshold:0.5,root:containerRef.current}
      );
      readObserver.current = observer;
      return observer.disconnect()
    }
  },[containerRef.current]);

  useEffect(()=>{
    if(containerRef && containerRef.current){
      console.log(containerRef.current);
      console.log('initializing seen observer');
      const observer = new IntersectionObserver(
        (entries,observer) => {
          entries.forEach(entry => {
            if(entry.target instanceof HTMLElement){
              const target = entry.target;
              const feedId = target?.dataset?.id;
              if(!feedId){
                observer.unobserve(target);
                return
              }
              console.log(entry.isIntersecting,entry.intersectionRatio,feedId);
              if(!(entry.isIntersecting)){
                return;
              }
              autoMarkSeen(feedId);
              observer.unobserve(target);
              //const box = target.getBoundingClientRect();
              //if(!(box.top>500)){ 
                //autoMarkSeen(feedId);
                //observer.unobserve(target);
              //  console.log('Mark Seen triggered');
              //}
            }
          });
        },
        { 
          threshold:[0],
          root:containerRef.current,
          rootMargin: `-120px 0px -${seenRootMargin}px 0px`,
        }
      );
      seenObserver.current = observer;
      return observer.disconnect()
    }
  },[containerRef.current]);
  return (
    <>
      <FeedListFilter searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
      <Feeds
        searchOpen={searchOpen} 
        showLoadMore={showLoadMore} 
        setLoadMore={setLoadMore}
        containerRef={containerRef}
        readObserver={readObserver}
        seenObserver={seenObserver}
      />
    </>
  );
}

export default connector(FeedList);
