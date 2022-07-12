import { useStore } from 'effector-react';
import { $confirmModal, changeConfirmModal, changeAddFormViewedModal } from 'src/models/modal/modal';
import Modal from 'src/components/shared/modal/modal';
import Button from '@mui/material/Button';

const ConfirmCancelModal = () => {
  const confirmModal = useStore($confirmModal);

  const closeModals = () => {
    changeConfirmModal(false);
    changeAddFormViewedModal(false);
  };

  return (
    <Modal active={confirmModal}>
      <div>
        <h2>При Отмене все введенные данные потеряются</h2>
        <Button
          variant="contained"
          color="success"
          onClick={() => changeConfirmModal(false)}
        >
          вернутся к заполнению
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => closeModals()}
        >
          Все равно отменить
        </Button>
      </div>
    </Modal>
  );
};
export default ConfirmCancelModal;
