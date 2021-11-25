import React,{useState} from "react";
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';
import clsx from "clsx";
// material components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import topMenuStyle from "./topMenuStyle";

import {doLogout} from 'hooks/auth';
import {toggleModal} from 'slices/authSlice';


interface OwnProps{
}

const mapState = (state: RootState) => ({
  user: state.auth.user,
});

const mapDispatch = (dispatch:AppDispatch) => ({
  logout(){
    dispatch(doLogout());
  },
  openModal(){
    dispatch(toggleModal(true));
  }
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

export const TopMenu = ({
  user,
  openModal,
  logout,
}:Props) => {
  const classes = topMenuStyle();

  const className = clsx(classes.appBar,{});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick= (event:React.MouseEvent<HTMLButtonElement>)=>{
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () =>{
    handleClose();
    logout();
  }
  return (
    <AppBar position="fixed" className={className}>
      <Toolbar className={clsx(classes.toolbar)}>
        <Typography>StockHeap</Typography>
        <div>
          {/*<Tooltip title="Settings">
            <IconButton color="inherit" onClick={()=>{}}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={()=>{}}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>*/}
          {!user && (
          <Tooltip title="Login">
            <Button color="inherit" onClick={()=>{openModal()}}>Login</Button>
          </Tooltip>
          )}
          {!!user && (
          <Tooltip title={user.email}>
            <>
            <IconButton aria-describedby={'account-popover'} color="inherit" onClick={handleClick} className={classes.logoutButton}>
              <Avatar>{user.email?user.email[0].toUpperCase():'U'}</Avatar>
            </IconButton>
            <Popover 
              id={'account-popover'} 
              anchorEl={anchorEl} 
              open={!!anchorEl} 
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Paper style={{width:150}}>
                <MenuList>
                  <MenuItem onClick={handleLogout}>
                    <Typography variant="inherit">Sign Out</Typography>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Popover>
            </>
          </Tooltip>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
  
}
export default connector(TopMenu);
