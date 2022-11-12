import * as store from "./store.js";
import * as wss from "./wss.js";
import * as weRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
//import {getIncommingCallDialog} from "./elements.js";
// connect with Node JS server
//initialization of socket ID connection
//const socket = io("http://localhost:4000");
const socket = io("http://192.168.2.127:4000");
wss.registerSocketEvents(socket);

weRTCHandler.getLocalPreview();

//register event for personal code copy button
const personalCodeCopyButton=document.getElementById('personal_code_copy_button');
personalCodeCopyButton.addEventListener('click',()=>{
    const personalCode=store.getState().socketId;
    console.log(personalCode);
    navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

//register event listeners for connections buttons
const personalCodeChatButton=document.getElementById('personal_code_chat_button');
const personalCodeVideoButton=document.getElementById('personal_code_video_button');

personalCodeChatButton.addEventListener('click',()=>{
    console.log("chat button clicked");
    const callType=constants.callType.CHAT_PERSONAL_CODE;
    const calleePersonalCode=document.getElementById('personal_code_input').value;
    weRTCHandler.sendPreOffer(callType,calleePersonalCode);
});

personalCodeVideoButton.addEventListener('click',()=>{
    console.log("video button clicked");
    const callType=constants.callType.VIDEO_PERSONAL_CODE;
    const calleePersonalCode=document.getElementById('personal_code_input').value;
    weRTCHandler.sendPreOffer(callType,calleePersonalCode);
});

/* getIncommingCallDialog(
    "VIDEO",
    ()=>{},
    ()=>{}
); */