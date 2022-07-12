import { IMessage } from 'src/types/IMessage';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DiamondIcon from '@mui/icons-material/Diamond';

export const getMessageEmotion = (message:IMessage) => {
  if (message.emotion) {
    if (message.emotion === 'cup') return <EmojiEventsIcon sx={{ fontSize: 'medium' }} />;
    if (message.emotion === 'clock') return <AccessAlarmIcon sx={{ fontSize: 'medium' }} />;
    if (message.emotion === 'diamond') return <DiamondIcon sx={{ fontSize: 'medium' }} />;
    if (message.emotion === 'like') return <InsertEmoticonIcon sx={{ fontSize: 'medium' }} />;
    if (message.emotion === 'disLike') return <SentimentDissatisfiedIcon sx={{ fontSize: 'medium' }} />;
  }
  return null;
};
