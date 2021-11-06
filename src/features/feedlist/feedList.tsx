import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import {Feeds,FeedListFilter} from './components';
import {doListFeeds} from 'hooks/feed';

interface OwnProps{
}

const mapState = (state: RootState) => ({
});

const mapDispatch = (dispatch:AppDispatch) => ({
  listFeeds(filters:any){
    dispatch(doListFeeds(filters))
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const FeedList = ({
  listFeeds,
}:Props) => {
  const [searchOpen,setSearchOpen] = useState(false);

  useEffect(()=> listFeeds({}),[]);
  return (
    <>
      <FeedListFilter searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
      <Feeds searchOpen={searchOpen} />
    </>
  );
}

export default connector(FeedList);
