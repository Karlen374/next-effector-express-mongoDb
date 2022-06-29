import { useStore } from 'effector-react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { $currentChatUsersData, $currentUsersChat, sendMessage } from 'src/models/chat/chat';
import { $userData } from 'src/models/authorization/authorization';
import styles from './Chat.module.scss';

const Chat = () => {
  const currentUsersChat = useStore($currentUsersChat);
  const currentChatUsersData = useStore($currentChatUsersData);
  const [currentChat, setCurrentChat] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const userData = useStore($userData);
  const socket = useRef();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    console.log('we in useEffect');
    setCurrentChat(currentUsersChat);
    // @ts-ignore
    socket.current = new WebSocket('ws://localhost:5001');
    // @ts-ignore
    socket.current.onopen = () => {
      console.log('открылся');
    };
    // @ts-ignore
    socket.current.onmessage = (event) => {
      if (JSON.parse(event.data).event !== 'write') {
        const messageFromSocket = JSON.parse(event.data);
        sendMessage({
          senderId: messageFromSocket.senderId,
          messageText: messageFromSocket.messageText,
          recipientId: messageFromSocket.recipientId,
        });
        console.log(messageFromSocket);
      } else console.log('write');
    };
    // @ts-ignore
    socket.current.onclose = () => {
      setErrorMessage('произошла ошибка обновите страницу');
    };
    // @ts-ignore
    socket.current.onerror = () => {
      setErrorMessage('произошла ошибка обновите страницу');
    };
  }, []);

  const sendOurMessage = () => {
    // sendMessage({
    //   senderId: currentChatUsersData.senderId,
    //   messageText: message,
    //   recipientId: currentChatUsersData.recipientId,
    // });
    setCurrentChat([...currentChat, {
      senderId: currentChatUsersData.senderId,
      messageText: message,
      _id: String(Date.now()),
    }]);
    const msg = {
      senderId: currentChatUsersData.senderId,
      messageText: message,
      recipientId: currentChatUsersData.recipientId,
      id: Date.now(),
      event: 'message',
    };
    // @ts-ignore
    socket.current.send(JSON.stringify(msg));
    setMessage('');
  };
  return (
    <div className={styles.Chat}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <h3 className={styles.Chat_Header}>
        Чат с
        {' '}
        {currentChatUsersData.recipientName}
      </h3>
      <div className={styles.Chat_Block}>
        {currentChat.map((item) => (
          <div
            className={item.senderId === userData._id
              ? styles.Chat_Block_Messages__send : styles.Chat_Block_Messages__received}
            key={item._id}
          >
            <Chip label={item.messageText} color="primary" />
          </div>
        ))}
      </div>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Сообщение"
      />
      {message && (
      <Button
        variant="contained"
        onClick={() => sendOurMessage()}
        endIcon={<SendRoundedIcon />}
      >
        отправить
      </Button>
      )}
    </div>
  );
};
export default Chat;
