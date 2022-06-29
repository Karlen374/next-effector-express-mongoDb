import { createEffect, createStore, createEvent } from 'effector';
import { request } from 'src/hooks/useHttp';
import { IMessage } from 'src/types/IMessage';

interface GetCurrentUsersMessagesProps {
  senderId: string;
  recipientId:string;
}
export const getCurrentUsersMessages = createEffect(async ({ senderId, recipientId }:GetCurrentUsersMessagesProps) => {
  const headers = { senderId, recipientId };
  const res = await request('http://localhost:5000/message/getMessages', 'GET', null, headers);
  return res;
});
interface IMessageProps {
  senderId: string;
  recipientId:string;
  messageText:string
}
export const sendMessage = createEffect(async ({ senderId, recipientId, messageText }:IMessageProps) => {
  const res = await request(
    'http://localhost:5000/message/sendMessage',
    'POST',
    JSON.stringify({ senderId, recipientId, messageText }),
  );
  return res;
});
export const addMessageFromWebSocket = createEvent<IMessage>();

export const $currentUsersChat = createStore<IMessage[]>([])
  .on(getCurrentUsersMessages.doneData, (_, messages) => messages)
  .on(sendMessage.doneData, (messages, message) => [...messages, message])
  .on(addMessageFromWebSocket, (currentUsersChat, message) => [...currentUsersChat, message]);

interface CurrentChatUsersData {
  senderId: string;
  recipientId: string;
  recipientName: string;
}
export const getCurrentChatRecipientName = createEvent<CurrentChatUsersData>();

export const $currentChatUsersData = createStore<CurrentChatUsersData>(null)
  .on(getCurrentChatRecipientName, (_, name) => name);
