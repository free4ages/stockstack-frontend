import React, {useEffect,useState} from 'react';
import { FixedSizeList } from "react-window";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import PinnedTagRow from './pinnedTagRow';

interface OwnProps{
}
const mapState = (state: RootState) => ({
});

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const PinnedTagList = ()=>{
  return (
    <FixedSizeList height={1000} width={299} itemCount={500} itemSize={34}>
      {PinnedTagRow}
    </FixedSizeList>
  )
}
export default connector(PinnedTagList);
