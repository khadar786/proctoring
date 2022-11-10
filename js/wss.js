import * as store from "./store.js";
import * as ui from "./ui.js";
import * as weRTCHandler from "./webRTCHandler.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {
    socket.on("connect",()=>{
        socketIO=socket;
        console.log("successfully connected socket.io server");
        console.log(socket.id);
        store.setSocketId(socket.id);
        ui.updatePersonalCode(socket.id);
      });

    socket.on("pre-offer",(data)=>{
      weRTCHandler.handlePreOffer(data);
    });
};

export const sendPreOffer=(data)=>{
  console.log("emmiting to server pre offer event");
  socketIO.emit("pre-offer",data);
}
