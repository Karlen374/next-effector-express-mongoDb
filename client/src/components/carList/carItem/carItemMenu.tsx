import { useStore } from 'effector-react';
import React, { useState } from 'react';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { $registeredUserData } from 'src/models/authorization/authorization';
import { getCurrentChatRecipientName, getCurrentUsersMessages } from 'src/models/chat/chat';
import { changeChatModal } from 'src/models/modal/modal';
import { ICar } from 'src/types/ICar';

interface CarItemMenuProps {
  car:ICar;
}
const CarItemMenu = ({ car }:CarItemMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const registeredUserData = useStore($registeredUserData);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openChatModal = () => {
    changeChatModal(true);
    handleClose();
    getCurrentUsersMessages({ senderId: registeredUserData._id, recipientId: car.userId });
    getCurrentChatRecipientName({
      senderId: registeredUserData._id,
      recipientId: car.userId,
      recipientName: car.userName,
    });
  };
  return (
    <>
      <IconButton
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        aria-label="share"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Link href={`/${car.id}`}>
          <MenuItem>
            Подробнее
          </MenuItem>
        </Link>
        { (registeredUserData && registeredUserData?._id !== car.userId && registeredUserData?.role !== 'ADMIN') && (
        <MenuItem onClick={() => openChatModal()}>
          Написать
          {' '}
          <RateReviewIcon />
        </MenuItem>
        )}
      </Menu>
    </>
  );
};
export default React.memo(CarItemMenu);
