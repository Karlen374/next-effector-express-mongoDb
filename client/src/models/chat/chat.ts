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
  _id:string;
}
export const sendMessage = createEffect(async ({
  senderId,
  recipientId,
  messageText,
  _id,
}:IMessageProps) => {
  const res = await request(
    'http://localhost:5000/message/sendMessage',
    'POST',
    JSON.stringify({
      senderId, recipientId, messageText, _id,
    }),
  );
  return res;
});
interface IMessageEmotionProps {
  messageId: string;
  emotion: string;
}
interface IEditMessageProps {
  messageId:string;
  editMessageText:string;
}
export const addEmotionInMessage = createEffect(async ({ messageId, emotion }:IMessageEmotionProps) => {
  const res = await request(
    'http://localhost:5000/message/addEmotion',
    'POST',
    JSON.stringify({ _id: messageId, emotion }),
  );
  return res;
});
export const editSelectedMessage = createEffect(async ({ messageId, editMessageText }:IEditMessageProps) => {
  const res = await request(
    'http://localhost:5000/message/editMessage',
    'POST',
    JSON.stringify({ messageId, editMessageText }),
  );
  return res;
});
export const delSelectedMessage = createEffect(async ({ id }) => {
  const res = await request(
    'http://localhost:5000/message/delMessage',
    'DELETE',
    JSON.stringify({ id }),
  );
  return res;
});

export const $currentUsersChat = createStore<IMessage[]>([])
  .on(getCurrentUsersMessages.doneData, (_, messages) => messages);

interface CurrentChatUsersData {
  senderId: string;
  recipientId: string;
  recipientName: string;
}
export const getCurrentChatRecipientName = createEvent<CurrentChatUsersData>();

export const $currentChatUsersData = createStore<CurrentChatUsersData>(null)
  .on(getCurrentChatRecipientName, (_, name) => name);
