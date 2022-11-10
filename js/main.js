import * as store from "./store.js";
import * as wss from "./wss.js";
// connect with Node JS server
//initialization of socket ID connection
var socketIO = io("http://localhost:4000");

wss.registerSocketEvents(socketIO);

//register event for personal code copy button
const personalCodeCopyButton=document.getElementById('personal_code_copy_button');
personalCodeCopyButton.addEventListener('click',()=>{
    const personalCode=store.getState().socketId;
    console.log(personalCode);
    navigator.clipboard && navigator.clipboard.writeText(personalCode);
});