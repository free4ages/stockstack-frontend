import React, {useEffect,useState,useContext} from 'react';
import { FixedSizeList } from "react-window";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import SubscribedTagRow from './subscribedTagRow';
import {doListSubscribedTags} from 'hooks/tag';
import {WebSocketContext} from 'components/webSocketProvider';
import {socketEmit} from 'hooks/socket';
import {onFetchFeedTagCount,onFetchFeedTagUpdate} from 'hooks/tag';

interface OwnProps{
  show: boolean;
}
const mapState = (state: RootState) => ({
  itemsCount: state.tags.subscribedIds.length,
  isLogged: !!state.auth.user
});

const mapDispatch = (dispatch:AppDispatch) => ({
  fetchTags(){
    dispatch(doListSubscribedTags());
  },
  subscribeFeeds(){
    dispatch(socketEmit('feed:subscribe',{}));
  },
  getFeedTagCounts(){
    dispatch(socketEmit('feed:counts',{}));
  },
  retrievedCounts(data:any){
    dispatch(onFetchFeedTagCount(data));
  },
  receivedUpdate(data:any){
    console.log(`Received update for ${data.tagName}`,data);
    dispatch(onFetchFeedTagUpdate(data));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SubscribedTagList = ({
  itemsCount,
  fetchTags,
  isLogged,
  show,
  subscribeFeeds,
  getFeedTagCounts,
  retrievedCounts,
  receivedUpdate,
}:Props)=>{
  const socket = useContext(WebSocketContext);
  const everLoaded = !!itemsCount;
  useEffect(()=>{
      fetchTags();
  },[])
  useEffect(()=>{
    if(isLogged){
      subscribeFeeds();
      getFeedTagCounts();
    }
  },[socket,isLogged])
  useEffect(()=>{
    if(isLogged){
      const handle1 = socket.on('feed:counts',(data:any)=>{
        retrievedCounts(data);
      }); 
      const handle2 = socket.on('feed:update',(data:any)=>{
        receivedUpdate(data);
      });
      return () => {handle1();handle2()};
    }
  },[socket,isLogged])
  return (
    //extra count for taking All tag
    <div style={show?{}:{display:'none'}}>
    <FixedSizeList height={700} width={299} itemCount={itemsCount+1} itemSize={34}>
      {SubscribedTagRow}
    </FixedSizeList>
    </div>
  )
}
export default connector(SubscribedTagList);

