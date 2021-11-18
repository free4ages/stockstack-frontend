import React, { createContext,useEffect } from 'react'
import {useAppSelector} from 'app/hooks';
import socketClient from 'app/socketClient';
const WebSocketContext = createContext<any>(null)
export { WebSocketContext }

const WebSocketProvider = ({ children }:{children:React.ReactNode}) => {
  const token = useAppSelector((state:any) => state.auth.token);
  useEffect(()=>{
    if(token){
      socketClient.connect(token);
    }
    else{
      socketClient.disconnect();
    }
    //return ()=>{ if(socket) socket.disconnect()}
  },[token])

  return (
    <WebSocketContext.Provider value={socketClient}>
      {children}
    </WebSocketContext.Provider>
  );
}
export default WebSocketProvider;  
