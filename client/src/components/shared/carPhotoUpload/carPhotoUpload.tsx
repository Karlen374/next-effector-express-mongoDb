import { useState } from 'react';
import { uploadCarPhoto } from 'src/models/cars/cars';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Modal from 'src/components/shared/modal/modal';
import { green } from '@mui/material/colors';
import { $carUpload, carPhotoUploadModal } from 'src/models/modal/modal';
import { useStore } from 'effector-react';
import styles from './carPhotoUpload.module.scss';

interface CarPhotoProps {
  id:string;
}
const CarPhotoUpload = ({ id }:CarPhotoProps) => {
  const [drag, setDrag] = useState<boolean>(false);
  const carUpload = useStore($carUpload);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onDropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadCarPhoto({ file, carId: id });
    carPhotoUploadModal(false);
    setDrag(false);
  };
  const changeHandler = (e) => {
    const file = e.target.files[0];
    uploadCarPhoto({ file, carId: id });
    carPhotoUploadModal(false);
  };
  return (
    <Modal active={carUpload}>
      <CloseOutlinedIcon
        onClick={() => carPhotoUploadModal(false)}
        className={styles.Car_Photo__Close}
      />
      <h2>Загрузка фотографии</h2>
      <label htmlFor="icon-button-file">
        <Input
          onChange={(e) => changeHandler(e)}
          className={styles.Car_Photo__Upload}
          id="icon-button-file"
          type="file"
        />
        <IconButton sx={{ fontSize: 14 }} color="success" aria-label="upload picture" component="span">
          выберите фотографию
          {' '}
          <CameraAltIcon sx={{ color: green[900] }} />
        </IconButton>
      </label>
      {drag
        ? (
          <div
            className={styles.Car_Photo_Drop__DropArea}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            отпустите картинку для загрузки
          </div>
        )
        : (
          <div
            className={styles.Car_Photo__DropArea}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
          >
            Перетащите картинку для загрузки
          </div>
        )}
    </Modal>
  );
};

export default CarPhotoUpload;
