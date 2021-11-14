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
        resolve(true)});
      this.socket.on('connect_error', (error:any) => reject(error));
    });
  }
  registerHandlers() {
    if(this.handlerRegistered) return;
    let handler:any;
    for(let i=0;i<this.handlers.length;i++){
      handler = this.handlers[i];
      this.socket.on(handler.event,handler.callback);
    }
    this.handlerRegistered = true;
  }
  runPendingActions() {
    this.pendingActions.forEach(action=>{
      this.emit(action.event,action.data);
    });
    this.pendingActions=[];
  }

  disconnect() {
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

  emit(event:string, data:any) {
    const action:{event:string,data:any} = {event,data};
    return new Promise((resolve, reject) => {
      if (!this.socket){
        //console.log("socket has not been initialized yet");
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
    const unsubscribe = () =>{
      if(this.socket){
        this.socket.off(handler.event,handler.callback);
      }
      const index = this.handlers.indexOf(handler);
      if(index!==-1){
        this.handlers.splice(index,1);
      }
    }
    if (this.socket){
      this.socket.on(handler.event, handler.callback);
    }
    this.handlers.push(handler);
    return unsubscribe;
  }
}

const socketClient = new SocketAPI();

export default socketClient;
