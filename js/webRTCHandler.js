import * as wss from "./wss.js";
import * as ui from "./ui.js";
import * as constants from "./constants.js";
let connectedUserDetails;

export const sendPreOffer = (callType, calleePersonalCode) => {
  connectedUserDetails = {
    callType,
    socketId: calleePersonalCode,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };
    ui.showCallingDialog(callingDialogRejectCallHandler);
    wss.sendPreOffer(data);
  }
};

export const handlePreOffer = (data) => {
  const { callType, callerSocketId } = data;

  connectedUserDetails = {
    socketId: callerSocketId,
    callType,
  };

  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    console.log(callType,"showing call dialog");
    ui.showIncomingCallDialog(callType,acceptCallHandler,rejectCallHandler);
  }
};

const acceptCallHandler = () => {
  console.log("call accepted");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
  ui.showCallElements(connectedUserDetails.callType);
};

const rejectCallHandler = () => {
  console.log("call rejected");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
};

const callingDialogRejectCallHandler = () => {
  console.log("rejecting the call");
  sendPreOfferAnswer();
};

const sendPreOfferAnswer=(preOfferAnswer)=>{
  const data={
    callerSocketId:connectedUserDetails.socketId,
    preOfferAnswer
  }
  ui.removeAllDialogs();
  wss.sendPreOfferAnswer(data);
};

export const handlePreOfferAnswer=(data)=>{
  const { preOfferAnswer }=data;
  //console.log("pre offer answer came");
  //console.log(data);
  ui.removeAllDialogs();

  if(preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND){
    //showing dialog the callee has been not found
    ui.showInfoDialog(preOfferAnswer);
  }

  if(preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE){
    //showing dialog the callee is not able to connect
    ui.showInfoDialog(preOfferAnswer);
  }

  if(preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED){
    //showing dialog the call is rejected by the callee
    ui.showInfoDialog(preOfferAnswer);
  }

  if(preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED){
    //send webRTC offer
    ui.showInfoDialog(preOfferAnswer);
  }
}



