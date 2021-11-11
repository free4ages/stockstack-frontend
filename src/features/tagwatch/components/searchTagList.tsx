import React, {useEffect,useState,useCallback,useMemo} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import SearchTagRow from './searchTagRow';

import { makeStyles, Theme } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";

import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import debounce from 'utils/debounce';
import tagService from 'services/tag.service';

const useStyles = makeStyles((theme: Theme) =>({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    //...theme.mixins.toolbar,
    justifyContent: "space-between",
  }
}));

interface OwnProps{
  exitSearch: () => void;
}

const mapState = (state: RootState) => ({
});

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const SearchTagList = ({
  exitSearch,
}:Props)=>{
  const [tags,setTags] = useState([]);
  const classes = useStyles();

  const search = (e:any)=>{
    tagService.search({q:e.target.value || '',limit:50,paginate:false}).then((res:any)=>{
      setTags(res.data.results);
    });
  };

  const changeHandler = useMemo(
    () => debounce<(e:any) => void>(search,300)
  ,[]);


  return (
    <>
    <div className={classes.drawerHeader}>
      <InputBase placeholder="Search Tags…" autoFocus
        onChange={changeHandler} />
      <IconButton onClick={() => exitSearch() }>
        <Close />
      </IconButton>
    </div>
    <Divider />
    <div>
      {tags.map((tag:any) => (
        <SearchTagRow key={tag.id} tag={tag} />
      ))}
    </div>
    </>
  );
}
export default connector(SearchTagList);


