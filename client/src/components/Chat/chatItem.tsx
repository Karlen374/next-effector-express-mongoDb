import Chip from '@mui/material/Chip';
import { IMessage } from 'src/types/IMessage';
import { useStore } from 'effector-react';
import { $registeredUserData } from 'src/models/authorization/authorization';
import { getMessageEmotion } from 'src/helpers/getMessageEmotion';
import styles from './chat.module.scss';

interface IChatItemProps {
  handleClickEdit:(event: React.MouseEvent<HTMLElement>, id: string)=>void;
  handleClickEmotions:(event: React.MouseEvent<HTMLElement>, id: string)=>void;
  item:IMessage;
  scrollRef:any;
}

export const ChatItem = ({
  handleClickEdit, handleClickEmotions, scrollRef, item,
}:IChatItemProps) => {
  const registeredUserData = useStore($registeredUserData);
  const emotion = getMessageEmotion(item);
  return (
    <div
      ref={scrollRef}
      className={item.senderId === registeredUserData._id
        ? styles.Chat_Block_Messages__send : styles.Chat_Block_Messages__received}
      key={item._id}
    >
      {item.senderId === registeredUserData._id
        ? (
          <Chip
            label={item.messageText}
            color="primary"
            icon={emotion}
            onClick={(e) => handleClickEdit(e, item._id)}
          />
        )
        : <Chip onClick={(e) => handleClickEmotions(e, item._id)} label={item.messageText} icon={emotion} />}
    </div>
  );
};
export default ChatItem;
