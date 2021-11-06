import React, {useEffect,useState} from 'react';
import { FixedSizeList } from "react-window";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import SubscribedTagRow from './subscribedTagRow';
import {doListSubscribedTags} from 'hooks/tag';

interface OwnProps{
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
}:Props)=>{
  useEffect(()=>{
    fetchTags();
  },[fetchTags])
  return (
    //extra count for taking All tag
    <FixedSizeList height={1000} width={299} itemCount={itemsCount+1} itemSize={34}>
      {SubscribedTagRow}
    </FixedSizeList>
  )
}
export default connector(SubscribedTagList);

