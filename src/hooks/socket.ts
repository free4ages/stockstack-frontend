const socketEmit = (event:string,payload:any) => {
  return {
    type: 'socket',
    types: ['SEND', 'SEND_SUCCESS', 'SEND_FAIL']
    promise: (socket) => socket.emit(event,payload)
  }
};

export {
  socketEmit
};
