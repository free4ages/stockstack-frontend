import React, {useEffect,useState,useContext} from 'react';
import { FixedSizeList } from "react-window";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import SubscribedTagRow from './subscribedTagRow';
import {doListSubscribedTags} from 'hooks/tag';
import {WebSocketContext} from 'components/webSocketProvider';
import {socketEmit} from 'hooks/socket';
import {
  onFetchFeedTagUpdate,
  doSubscribeAllTags,
} from 'hooks/tag';

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
  subscribeTags(){
    dispatch(doSubscribeAllTags());
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
  subscribeTags,
  receivedUpdate,
}:Props)=>{
  const socket = useContext(WebSocketContext);
  const everLoaded = !!itemsCount;
  useEffect(()=>{
      fetchTags();
  },[isLogged])
  useEffect(()=>{
    if(isLogged){
      const handle2 = socket.on('feed:update',(data:any)=>{
        receivedUpdate(data);
      });
      const handle3 = socket.on('connect',()=>{
        setTimeout(()=>subscribeTags(),2000);
      });
      return () => {handle2();handle3()};
      //return () => {handle1();handle2();handle3()};
    }
  },[socket,isLogged])
  return (
    //extra count for taking All tag
    <div style={show?{}:{display:'none'}}>
      {itemsCount?(
        <FixedSizeList height={700} width={299} itemCount={itemsCount+1} itemSize={34}>
          {SubscribedTagRow}
        </FixedSizeList>
      ):(
        <div style={{padding:15}}>
        <span>Not Subscribed Yet? Search and subscribe to monitor stock, sectors and more</span>
        </div>
      )}
    </div>
  )
}
export default connector(SubscribedTagList);

