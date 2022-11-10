import * as wss from "./wss.js";
import * as ui from "./ui.js";
import * as constants from "./constants.js";
let connectedUserDetails;

export const sendPreOffer=(callType,calleePersonalCode)=>{
  console.log("pre offer function executed");
  console.log(callType,calleePersonalCode);
  const data={
    callType,
    calleePersonalCode
  };
  wss.sendPreOffer(data);
}

export const handlePreOffer=(data)=>{
  console.log("pre offer came");
  console.log(data);
  const {callType,callerSocketId}=data;

  connectedUserDetails={
    socketID:callerSocketId,
    callType
  }

  if(callType==constants.callType.CHAT_PERSONAL_CODE || callType==constants.callType.VIDEO_PERSONAL_CODE){
    ui.showingIncomingCallDialog(callType,acceptCallHandler,rejectCallHandler);
  }
}

const acceptCallHandler=()=>{
  console.log("call accepted");
}

const rejectCallHandler=()=>{
  console.log("call rejected");
}

