
import * as constants from "./constants.js";
import * as elements from "./elements.js";
export const updatePersonalCode=(personalcode)=>{
    const personalCodeParagraph=document.getElementById('personal_code_paragraph');
    personalCodeParagraph.innerHTML=personalcode;
}

export const showIncomingCallDialog = (
    callType,
    acceptCallHandler,
    rejectCallHandler
  ) => {
    const callTypeInfo =
      callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";
  
    const incomingCallDialog = elements.getIncommingCallDialog(callTypeInfo,acceptCallHandler,rejectCallHandler
    );
  
    // removing all dialogs inside HTML dialog element
    const dialog = document.getElementById("dialog");
    dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  
    dialog.appendChild(incomingCallDialog);
  };

export const showCallingDialog=(rejectCallHandler)=>{
    const callinDialog=elements.getCallingDialog(rejectCallHandler);

    //removing all dialogs inside HTML dialog element
    const dialog=document.getElementById("dialog");
    dialog.querySelectorAll("*").forEach((dialog)=>dialog.remove());
    dialog.appendChild(callinDialog);
};