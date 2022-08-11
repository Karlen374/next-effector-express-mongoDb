import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { green, red } from '@mui/material/colors';
import { $anchorElEditMenu, resetAnchorElEditMenu } from 'src/models/chat/chat';
import { useStore } from 'effector-react';
import React from 'react';

interface IChatMessageEditMenuProps {
  getEditMessage:()=>void;
  deleteOurMessage:()=>void;
}

const ChatMessageEditMenu = ({ getEditMessage, deleteOurMessage }:IChatMessageEditMenuProps) => {
  const anchorElEditMenu = useStore($anchorElEditMenu);
  const open = Boolean(anchorElEditMenu);
  const handleClose = () => {
    resetAnchorElEditMenu();
  };

  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorElEditMenu}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem sx={{ color: green[700] }} onClick={() => getEditMessage()}>
        редактировать
        <EditIcon />
      </MenuItem>
      <MenuItem sx={{ color: red[500] }} onClick={() => deleteOurMessage()}>
        удалить
        <DeleteIcon />
      </MenuItem>
    </Menu>
  );
};
export default React.memo(ChatMessageEditMenu);
