export interface IMessage {
  participants?:string[];
  senderId:string;
  messageText:string;
  _id:string;
  emotion?:string;
}
