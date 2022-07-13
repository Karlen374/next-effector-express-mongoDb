import { useStore } from 'effector-react';
import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useChat } from 'src/hooks/useChat';
import {
  $currentChatUsersData,
  $currentUsersChat,
  $socketServerError,
  $writeMessageStatus,
  changeAnchorElEditMenu,
  changeAnchorElEmotionsMenu,
  resetAnchorElEditMenu,
} from 'src/models/chat/chat';
import styles from './chat.module.scss';
import ChatEmotionMenu from './chatEmotionMenu';
import ChatMessageEditMenu from './chatMessageEditMenu';
import ChatItem from './chatItem';

const Chat = () => {
  const currentUsersChat = useStore($currentUsersChat);
  const currentChatUsersData = useStore($currentChatUsersData);
  const socketServerError = useStore($socketServerError);
  const writeMessageStatus = useStore($writeMessageStatus);
  const scrollRef = useRef(null);
  const [message, setMessage] = useState<string>('');
  const [currentMessageId, setCurrentMessageId] = useState<string>('');
  const [editMessageId, setEditMessageId] = useState<string>('');
  const {
    startWebSocketServer,
    addNewMessage,
    editMessage,
    closeWebSocketServer,
    sendWriteMessage,
    addMessageEmotion,
    deleteMessage,
  } = useChat();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentUsersChat.length]);

  useEffect(() => {
    startWebSocketServer();
    return () => closeWebSocketServer();
  }, []);

  const handleClickEmotions = (event: React.MouseEvent<HTMLElement>, id: string) => {
    changeAnchorElEmotionsMenu(event);
    setCurrentMessageId(id);
  };

  const handleClickEdit = (event: React.MouseEvent<HTMLElement>, id: string) => {
    changeAnchorElEditMenu(event);
    setEditMessageId(id);
  };

  const sendOurMessage = () => {
    if (!editMessageId) {
      addNewMessage(message);
      setMessage('');
    } else {
      editMessage(editMessageId, message);
      setEditMessageId('');
      setMessage('');
    }
  };

  const changeInputMessage = (e) => {
    setMessage(e.target.value);
    sendWriteMessage();
  };
  const getEditMessage = useCallback(() => {
    const editMessageText = currentUsersChat?.filter((item) => item._id === editMessageId)[0]?.messageText;
    setMessage(editMessageText);
    resetAnchorElEditMenu();
  }, [currentUsersChat, editMessageId]);

  const deleteOurMessage = useCallback(() => {
    deleteMessage(editMessageId);
    setEditMessageId('');
    resetAnchorElEditMenu();
  }, [editMessageId]);

  return (
    <div className={styles.Chat}>
      {socketServerError && <Alert severity="error">Произошла ошибка обновите страницу</Alert>}
      <h3 className={styles.Chat_Header}>
        Чат с
        {' '}
        {currentChatUsersData.recipientName}
      </h3>
      <div className={styles.Chat_Block}>
        {currentUsersChat.map((item) => {
          return (
            <ChatItem
              key={item._id}
              scrollRef={scrollRef}
              handleClickEdit={handleClickEdit}
              handleClickEmotions={handleClickEmotions}
              item={item}
            />
          );
        })}
        <ChatEmotionMenu currentMessageId={currentMessageId} addMessageEmotion={addMessageEmotion} />
        <ChatMessageEditMenu getEditMessage={getEditMessage} deleteOurMessage={deleteOurMessage} />

        { writeMessageStatus && <Chip label={`${currentChatUsersData.recipientName} Печатает...`} />}
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
