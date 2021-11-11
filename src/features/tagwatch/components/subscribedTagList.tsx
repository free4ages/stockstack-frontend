import React, {useEffect,useState,useContext} from 'react';
import { FixedSizeList } from "react-window";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import SubscribedTagRow from './subscribedTagRow';
import {doListSubscribedTags} from 'hooks/tag';
import {WebSocketContext} from 'components/webSocketProvider';

interface OwnProps{
  show: boolean;
}
const mapState = (state: RootState) => ({
  itemsCount: state.tags.subscribedIds.length,
});

const mapDispatch = (dispatch:AppDispatch) => ({
  fetchTags(){
    dispatch(doListSubscribedTags());
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SubscribedTagList = ({
  itemsCount,
  fetchTags,
  show
}:Props)=>{
  const socket = useContext(WebSocketContext);
  const everLoaded = !!itemsCount;
  useEffect(()=>{
      fetchTags();
  },[])
  useEffect(()=>{

  },[socket])
  return (
    //extra count for taking All tag
    <div style={show?{}:{display:'none'}}>
    <FixedSizeList height={1000} width={299} itemCount={itemsCount+1} itemSize={34}>
      {SubscribedTagRow}
    </FixedSizeList>
    </div>
  )
}
export default connector(SubscribedTagList);

