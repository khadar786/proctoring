
import * as constants from "./constants.js";
import * as elements from "./elements.js";
export const updatePersonalCode=(personalcode)=>{
    const personalCodeParagraph=document.getElementById('personal_code_paragraph');
    personalCodeParagraph.innerHTML=personalcode;
}

export const showingIncomingCallDialog=(
    callType,
    acceptCallHandler,
    rejectCallHandler)=>{

    const  chatTypeInfo=callType === constants.callType.CHAT_PERSONAL_CODE?"CHAT":"VIDEO";

    const incommingCallDialog=elements.getIncommingCallDialog();
}