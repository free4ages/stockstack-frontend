const socketEmit = (event:string,payload:any) => {
  return {
    type: 'socket',
    types: ['SOCKET_SEND', 'SOCKET_SEND_SUCCESS', 'SOCKET_SEND_FAIL'],
    promise: (socket:any) => socket.emit(event,payload)
  }
};

export {
  socketEmit
};
