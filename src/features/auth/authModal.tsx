import React, {useEffect,useState} from 'react';
import { ConnectedProps,connect } from 'react-redux'
import {RootState,AppDispatch} from 'app/store';

import Modal from '@material-ui/core/Modal';

import Auth from './auth';

interface OwnProps{
}

const mapState = (state: RootState) => ({
  modalOpen: state.auth.modalOpen,
});

const mapDispatch = (dispatch:AppDispatch) => ({
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const AuthModal = ({
  modalOpen,
}:Props) => {
  return (
    <Modal open={modalOpen} >
      <Auth />
    </Modal>
  );
};
export default connector(AuthModal);
