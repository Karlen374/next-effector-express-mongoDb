import { useStore } from 'effector-react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {
  $currentChatUsersData,
  $currentUsersChat,
  sendMessage,
} from 'src/models/chat/chat';
import { $userData } from 'src/models/authorization/authorization';
import styles from './Chat.module.scss';

const Chat = () => {
  const currentUsersChat = useStore($currentUsersChat);
  const currentChatUsersData = useStore($currentChatUsersData);
  const [currentChat, setCurrentChat] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const userData = useStore($userData);
  const socket = useRef(null);
  const timer = useRef(null);
  const [write, setWrite] = useState(false);
  const scrollRef = useRef(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  useEffect(() => {
    setCurrentChat(currentUsersChat);
  }, [currentUsersChat]);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5001');
    socket.current.onmessage = (event) => {
      if (JSON.parse(event.data).event !== 'write') {
        const messageFromSocket = JSON.parse(event.data);
        setCurrentChat((prev) => [...prev, {
          senderId: messageFromSocket.senderId,
          messageText: messageFromSocket.messageText,
          _id: messageFromSocket.id,
        }]);
      } else {
        setWrite(true);
        if (timer.current) {
          clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
          setWrite(false);
        }, 1000);
      }
    };

    socket.current.onclose = () => {
      setErrorMessage('произошла ошибка обновите страницу');
    };

    socket.current.onerror = () => {
      setErrorMessage('произошла ошибка обновите страницу');
    };
  }, []);

  const sendOurMessage = () => {
    sendMessage({
      senderId: currentChatUsersData.senderId,
      messageText: message,
      recipientId: currentChatUsersData.recipientId,
    });
    setCurrentChat([...currentChat, {
      senderId: currentChatUsersData.senderId,
      messageText: message,
      _id: String(Date.now()),
    }]);
    const socketMessage = {
      senderId: currentChatUsersData.senderId,
      messageText: message,
      recipientId: currentChatUsersData.recipientId,
      id: Date.now(),
      event: 'message',
    };

    socket.current.send(JSON.stringify(socketMessage));
    setMessage('');
  };
  const changeInputMessage = (e) => {
    setMessage(e.target.value);
    const socketMessage = {
      messageText: 'Печатает...',
      event: 'write',
    };

    socket.current.send(JSON.stringify(socketMessage));
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
            ref={scrollRef}
            className={item.senderId === userData._id
              ? styles.Chat_Block_Messages__send : styles.Chat_Block_Messages__received}
            key={item._id}
          >
            {item.senderId === userData._id
              ? (
                <Chip
                  label={item.messageText}
                  color="primary"
                />
              )
              : <Chip label={item.messageText} />}
          </div>
        ))}
        { write && <Chip label={`${currentChatUsersData.recipientName} Печатает...`} />}
      </div>
      <TextField
        value={message}
        onChange={(e) => changeInputMessage(e)}
        label="Сообщение"
      />
      <div>

        {message && (
        <Button
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => sendOurMessage()}
          endIcon={<SendRoundedIcon />}
        >
          отправить
        </Button>
        )}
      </div>
    </div>
  );
};
export default Chat;
