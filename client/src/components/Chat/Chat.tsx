import { useStore } from 'effector-react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { v4 as uuid } from 'uuid';
import Chip from '@mui/material/Chip';
import {
  yellow, green, red, blue, purple,
} from '@mui/material/colors';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DiamondIcon from '@mui/icons-material/Diamond';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  $currentChatUsersData,
  $currentUsersChat,
  addEmotionInMessage,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMessageId, setCurrentMessageId] = useState<string>('');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentMessageId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  useEffect(() => {
    setCurrentChat(currentUsersChat);
  }, [currentUsersChat]);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:5001');
    socket.current.onmessage = (event) => {
      if (JSON.parse(event.data).event === 'message') {
        const messageFromSocket = JSON.parse(event.data);
        setCurrentChat((prev) => [...prev, {
          senderId: messageFromSocket.senderId,
          messageText: messageFromSocket.messageText,
          _id: messageFromSocket.id,
        }]);
      }
      if (JSON.parse(event.data).event === 'write') {
        setWrite(true);
        if (timer.current) {
          clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
          setWrite(false);
        }, 1000);
      }
      if (JSON.parse(event.data).event === 'emotion') {
        const messageFromSocket = JSON.parse(event.data);
        setCurrentChat((prev) => prev.map((item) => {
          if (item._id === messageFromSocket.id) item.emotion = messageFromSocket.emotion;
          return item;
        }));
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
    const messageId = uuid();
    sendMessage({
      senderId: currentChatUsersData.senderId,
      messageText: message,
      recipientId: currentChatUsersData.recipientId,
      _id: messageId,
    });
    setCurrentChat([...currentChat, {
      senderId: currentChatUsersData.senderId,
      messageText: message,
      _id: messageId,
    }]);
    const socketMessage = {
      senderId: currentChatUsersData.senderId,
      messageText: message,
      recipientId: currentChatUsersData.recipientId,
      id: messageId,
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
  const addMessageEmotion = (emotion) => {
    addEmotionInMessage({ messageId: currentMessageId, emotion });
    const socketMessage = {
      emotion,
      id: currentMessageId,
      event: 'emotion',
    };
    setCurrentChat(currentChat.map((item) => {
      if (item._id === currentMessageId) item.emotion = emotion;
      return item;
    }));
    socket.current.send(JSON.stringify(socketMessage));
    handleClose();
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
        {currentChat.map((item) => {
          let emotion;
          if (item.emotion) {
            if (item.emotion === 'cup') emotion = <EmojiEventsIcon sx={{ fontSize: 'medium', color: yellow[400] }} />;
            if (item.emotion === 'clock') emotion = <AccessAlarmIcon sx={{ fontSize: 'medium', color: red[900] }} />;
            if (item.emotion === 'diamond') emotion = <DiamondIcon sx={{ fontSize: 'medium', color: blue[500] }} />;
            if (item.emotion === 'like') {
              emotion = <InsertEmoticonIcon sx={{ fontSize: 'medium', color: green[800] }} />;
            }
            if (item.emotion === 'disLike') {
              emotion = <SentimentDissatisfiedIcon sx={{ fontSize: 'medium', color: red[700] }} />;
            }
          }

          return (
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
                    icon={emotion}
                  />
                )
                : <Chip onClick={(e) => handleClick(e, item._id)} label={item.messageText} icon={emotion} />}
            </div>
          );
        })}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => addMessageEmotion('cup')}>
            <EmojiEventsIcon sx={{ color: yellow[700] }} />
          </MenuItem>
          <MenuItem onClick={() => addMessageEmotion('clock')}>
            <AccessAlarmIcon sx={{ color: purple[500] }} />
          </MenuItem>
          <MenuItem onClick={() => addMessageEmotion('diamond')}>
            <DiamondIcon sx={{ color: blue[500] }} />
          </MenuItem>
          <MenuItem onClick={() => addMessageEmotion('like')}>
            <InsertEmoticonIcon sx={{ color: green[800] }} />
          </MenuItem>
          <MenuItem onClick={() => addMessageEmotion('disLike')}>
            <SentimentDissatisfiedIcon sx={{ color: red[500] }} />
          </MenuItem>
        </Menu>
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
