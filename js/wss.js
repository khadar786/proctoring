import * as store from "./store.js";
import * as ui from "./ui.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {
    socket.on("connect",()=>{
        console.log("successfully connected socket.io server");
        console.log(socket.id);
        store.setSocketId(socket.id);
        ui.updatePersonalCode(socket.id);
      });
};
