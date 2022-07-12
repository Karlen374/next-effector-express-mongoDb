import { useStore } from 'effector-react';
import { $anchorElEmotionsMenu, resetAnchorElEmotionsMenu } from 'src/models/chat/chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DiamondIcon from '@mui/icons-material/Diamond';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  yellow, green, red, blue, purple,
} from '@mui/material/colors';
import styles from './chat.module.scss';

interface IChatEmotionMenuProps {
  currentMessageId: string;
  addMessageEmotion(emotion:string, currentMessageId:string):void;
}
const ChatEmotionMenu = ({ currentMessageId, addMessageEmotion }:IChatEmotionMenuProps) => {
  const anchorElEmotionsMenu = useStore($anchorElEmotionsMenu);
  const openEmotionsMenu = Boolean(anchorElEmotionsMenu);
  const handleCloseEmotions = () => {
    resetAnchorElEmotionsMenu();
  };
  const addEmotionInCurrentMessage = (emotion) => {
    addMessageEmotion(emotion, currentMessageId);
    resetAnchorElEmotionsMenu();
  };
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorElEmotionsMenu}
      open={openEmotionsMenu}
      onClose={handleCloseEmotions}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div className={styles.Chat_Block_Menu__Emotions}>
        <MenuItem onClick={() => addEmotionInCurrentMessage('cup')}>
          <EmojiEventsIcon sx={{ color: yellow[700] }} />
        </MenuItem>
        <MenuItem onClick={() => addEmotionInCurrentMessage('clock')}>
          <AccessAlarmIcon sx={{ color: purple[500] }} />
        </MenuItem>
        <MenuItem onClick={() => addEmotionInCurrentMessage('diamond')}>
          <DiamondIcon sx={{ color: blue[500] }} />
        </MenuItem>
        <MenuItem onClick={() => addEmotionInCurrentMessage('like')}>
          <InsertEmoticonIcon sx={{ color: green[800] }} />
        </MenuItem>
        <MenuItem onClick={() => addEmotionInCurrentMessage('disLike')}>
          <SentimentDissatisfiedIcon sx={{ color: red[500] }} />
        </MenuItem>
      </div>
    </Menu>
  );
};
export default ChatEmotionMenu;
