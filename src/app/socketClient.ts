import io from 'socket.io-client';
import config from 'config';
class SocketAPI {
  socket:any;
  handlers:{event:string,callback:any}[] = [];
  connected = false;
  handlerRegistered = false;
  pendingActions:{event:string,data:any}[] = [];
  connect(token:string) {
    if(this.socket) return Promise.resolve();
    this.socket = io(config.webSocketUrl, { auth: {token:`Bearer ${token}`} });
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log("My socket connected");
        this.registerHandlers();
        this.runPendingActions();
        this.runConnectHandlers();
        resolve(true)});
      this.socket.on('disconnect', ()=>{
        console.log("My Socket Disconnected");
      });
      this.socket.on('connect_error', (error:any) => reject(error));
    });
  }
  registerHandlers() {
    if(this.handlerRegistered) return;
    this.handlers.forEach(handler=>{
      if(handler.event!=="connect"){
        this.socket.on(handler.event,handler.callback);
      }
    },this);
    this.handlerRegistered = true;
  }
  runConnectHandlers(){
    this.handlers.forEach(handler=>{
      if(handler.event==="connect"){
        handler.callback();
      }
    },this);
  }
  runPendingActions() {
    this.pendingActions.forEach(action=>{
      this.emit(action.event,action.data);
    });
    this.pendingActions=[];
  }

  disconnect(){
    return new Promise((resolve) => {
      if(this.socket){
        this.socket.disconnect(() => {
          this.socket = null;
          this.handlerRegistered=false;
          resolve(true);
        });
      }
      else{
        resolve(true);
      }
    });
  }

  emit(event:string, data:any,options:{immediate?:boolean}={}) {
    const action:{event:string,data:any} = {event,data};
    const {immediate=false} = options;
    return new Promise((resolve, reject) => {
      if (!this.socket){
        //console.log("socket has not been initialized yet");
        if(immediate){
          return reject(new Error(`Cannot emit ${event} as socket is not connected yet`));
        }
        this.pendingActions.push(action);
        return resolve(false);
      }
      console.log(`Emiting socket event ${event}`,data);
      return this.socket.emit(event, data, (response:any) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }

        return resolve(true);
      });
    });
  }

  on(event:string, fun:any) {
    // No promise is needed here, but we're expecting one in the middleware.
    const handler = {event,callback:fun};
    const socket = this.socket;

    const unsubscribe = () =>{
      if(socket && handler.event!=="connect"){
        socket.off(handler.event,handler.callback);
      }
      const index = this.handlers.indexOf(handler);
      if(index!==-1){
        this.handlers.splice(index,1);
      }
    }
    if (socket && handler.event!=="connect"){
      this.socket.on(handler.event, handler.callback);
    }
    if(socket && handler.event==="connect" && socket.connected){
      handler.callback();
    }
    this.handlers.push(handler);
    return unsubscribe;
  }
  once(event:string,fun:any){
    if(!this.socket){
      throw new Error(`Cannot register ${event} as socket is not connected yet`);
    }
    const socket = this.socket;
    const callback = (...args:any) => {
      socket.off(event,callback);
      fun(...args);
    }
    socket.on(event,callback);
    return () => socket.off(event,callback);
  }
  request<T>(path:string,data:any):Promise<T>{
    if(!this.socket){
      throw new Error(`Cannot register ${path} as socket is not connected yet`);
    }
    const socket = this.socket;
    return new Promise((resolve,reject) => {
      const callback = (data:any) => {
        resolve(data);
      }
      const cancel = this.once(path,callback);
      this.emit(path,data).then((success)=>{},(error)=>{
        cancel();
        reject(error)
      });
    });
  }
}

const socketClient = new SocketAPI();

export default socketClient;
