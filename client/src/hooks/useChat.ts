import { useStore } from 'effector-react';
import { useRef } from 'react';
import {
  $currentChatUsersData,
  addEmotionInMessage,
  addLocalMessageEmotion,
  addMessage,
  deleteLocalMessage,
  delSelectedMessage,
  editLocalMessage,
  editSelectedMessage,
  sendMessage,
  changeWriteMessageStatus,
  changeSocketServerErrorStatus,
} from 'src/models/chat/chat';
import { v4 as uuid } from 'uuid';

export const useChat = () => {
  const timer = useRef(null);
  const socket = useRef(null);
  const currentChatUsersData = useStore($currentChatUsersData);
  const startWebSocketServer = () => {
    socket.current = new WebSocket('ws://localhost:5001');
    socket.current.onmessage = (event) => {
      if (JSON.parse(event.data).event === 'message') {
        const messageFromSocket = JSON.parse(event.data);
        addMessage({
          senderId: messageFromSocket.senderId,
          messageText: messageFromSocket.messageText,
          _id: messageFromSocket.id,
        });
      }
      if (JSON.parse(event.data).event === 'write') {
        changeWriteMessageStatus(true);
        if (timer.current) {
          clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
          changeWriteMessageStatus(false);
        }, 1000);
      }
      if (JSON.parse(event.data).event === 'emotion') {
        const messageFromSocket = JSON.parse(event.data);
        addLocalMessageEmotion({ emotionMessageId: messageFromSocket.id, emotion: messageFromSocket.emotion });
      }
      if (JSON.parse(event.data).event === 'edit') {
        const messageFromSocket = JSON.parse(event.data);
        editLocalMessage({ message: messageFromSocket.message, editMessageId: messageFromSocket.id });
      }
      if (JSON.parse(event.data).event === 'delete') {
        const messageFromSocket = JSON.parse(event.data);
        deleteLocalMessage(messageFromSocket.id);
      }
    };
    socket.current.onclose = () => {
      changeSocketServerErrorStatus(true);
    };

    socket.current.onerror = () => {
      changeSocketServerErrorStatus(true);
    };
  };
  const addMessageEmotion = (emotion:string, currentMessageId:string) => {
    addEmotionInMessage({ messageId: currentMessageId, emotion });
    const socketMessage = {
      emotion,
      id: currentMessageId,
      event: 'emotion',
    };
    addLocalMessageEmotion({ emotionMessageId: currentMessageId, emotion });
    socket.current?.send(JSON.stringify(socketMessage));
  };

  const addNewMessage = (message:string) => {
    const messageId = uuid();
    sendMessage({
      senderId: currentChatUsersData.senderId,
      messageText: message,
      recipientId: currentChatUsersData.recipientId,
      _id: messageId,
    });
    addMessage({
      senderId: currentChatUsersData.senderId,
      messageText: message,
      _id: messageId,
    });
    const socketMessage = {
      senderId: currentChatUsersData.senderId,
      messageText: message,
      recipientId: currentChatUsersData.recipientId,
      id: messageId,
      event: 'message',
    };

    socket.current.send(JSON.stringify(socketMessage));
  };
  const editMessage = (editMessageId:string, message:string) => {
    editSelectedMessage({ messageId: editMessageId, editMessageText: message });
    editLocalMessage({ message, editMessageId });
    const socketMessage = {
      message,
      id: editMessageId,
      event: 'edit',
    };
    socket.current.send(JSON.stringify(socketMessage));
  };
  const sendWriteMessage = () => {
    const socketMessage = {
      messageText: 'Печатает...',
      event: 'write',
    };

    socket.current.send(JSON.stringify(socketMessage));
  };
  const deleteMessage = (id:string) => {
    delSelectedMessage({ id });
    socket.current.send(JSON.stringify({ id, event: 'delete' }));
    deleteLocalMessage(id);
  };
  return {
    startWebSocketServer, addMessageEmotion, addNewMessage, editMessage, sendWriteMessage, deleteMessage,
  };
};
