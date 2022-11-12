import * as store from "./store.js";
import * as ui from "./ui.js";
import * as weRTCHandler from "./webRTCHandler.js";
import * as constants from './constants.js';
let socketIO = null;

export const registerSocketEvents = (socket) => {
  socketIO = socket;

  socket.on("connect", () => {
    console.log("succesfully connected to socket.io server");
    store.setSocketId(socket.id);
    ui.updatePersonalCode(socket.id);
  });

  socket.on("pre-offer", (data) => {
    console.log("receive pre-offer:",data);
    weRTCHandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    //console.log("receive pre-offer:",data);
    weRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on("webRTC-signaling", (data) => {
    switch (data.type) {
      case constants.webRTCSignaling.OFFER:
        weRTCHandler.handleWebRTCOffer(data);
        break;
      case constants.webRTCSignaling.ANSWER:
        weRTCHandler.handleWebRTCAnswer(data);
        break;
      case constants.webRTCSignaling.ICE_CANDIDATE:
        weRTCHandler.handleWebRTCCandidate(data);
        break;
      default:
        return;
    }
  });

};

export const sendPreOffer = (data) => {
  console.log("emmiting to server pre offer event");
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer=(data)=>{
  socketIO.emit("pre-offer-answer",data);
};

export const sendDataUsingWebRTCSignaling=(data)=>{
  socketIO.emit("webRTC-signaling",data);
};
