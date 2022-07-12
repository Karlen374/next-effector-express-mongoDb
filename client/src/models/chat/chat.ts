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
interface EmotionMessageProps {
  emotionMessageId: string;
  emotion: string
}
interface EditMessageProps {
  editMessageId: string;
  message: string
}
export const addMessage = createEvent<IMessage>();
export const addLocalMessageEmotion = createEvent<EmotionMessageProps>();
export const editLocalMessage = createEvent<EditMessageProps>();
export const deleteLocalMessage = createEvent<string>('');

export const $currentUsersChat = createStore<IMessage[]>([])
  .on(getCurrentUsersMessages.doneData, (_, messages) => messages)
  .on(addMessage, (currentUsersChat, message) => [...currentUsersChat, message])
  .on(addLocalMessageEmotion, (currentUsersChat, data) => currentUsersChat.map((item) => {
    if (item._id === data.emotionMessageId) item.emotion = data.emotion;
    return item;
  }))
  .on(editLocalMessage, (currentUsersChat, data) => (currentUsersChat.map((item) => {
    if (item._id === data.editMessageId) item.messageText = data.message;
    return item;
  })))
  .on(deleteLocalMessage, (currentUsersChat, deleteMessageId) => {
    return currentUsersChat.filter((item) => item._id !== deleteMessageId);
  });

interface CurrentChatUsersData {
  senderId: string;
  recipientId: string;
  recipientName: string;
}
export const getCurrentChatRecipientName = createEvent<CurrentChatUsersData>();

export const $currentChatUsersData = createStore<CurrentChatUsersData>(null)
  .on(getCurrentChatRecipientName, (_, name) => name);

export const changeAnchorElEmotionsMenu = createEvent<React.MouseEvent<HTMLElement> | null>();
export const resetAnchorElEmotionsMenu = createEvent();

export const $anchorElEmotionsMenu = createStore<null | HTMLElement>(null)
  .on(changeAnchorElEmotionsMenu, (_, data) => data?.currentTarget)
  .reset(resetAnchorElEmotionsMenu);

export const changeAnchorElEditMenu = createEvent<React.MouseEvent<HTMLElement> | null>();
export const resetAnchorElEditMenu = createEvent();

export const $anchorElEditMenu = createStore<null | HTMLElement>(null)
  .on(changeAnchorElEditMenu, (_, data) => data?.currentTarget)
  .reset(resetAnchorElEditMenu);

export const changeWriteMessageStatus = createEvent<boolean>();

export const $writeMessageStatus = createStore<boolean>(false)
  .on(changeWriteMessageStatus, (_, status) => status);

export const changeSocketServerErrorStatus = createEvent<boolean>();

export const $socketServerError = createStore<boolean>(false)
  .on(changeSocketServerErrorStatus, (_, status) => status);
