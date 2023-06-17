import { serverTimestamp } from "firebase/firestore";

export class Chat {
    senderUid : string = "";
    message : string = "";
    timeStamp : any = serverTimestamp();
    type : string = "";
    link : string = "";
    groupId:string = "";
    senderName:string = "";
  }