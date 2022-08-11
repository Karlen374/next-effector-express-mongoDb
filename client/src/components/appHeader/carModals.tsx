import { useStore } from 'effector-react';
import { $advertisementModal, $chatModal } from 'src/models/modal/modal';
import Chat from 'src/components/Chat/chat';
import CreateAdvertisement from 'src/components/shared/createAdvertisement/createAdvertisement';
import Modal from 'src/components/shared/modal/modal';
import React from 'react';

const CarModals = () => {
  const modal = useStore($advertisementModal);
  const chatModal = useStore($chatModal);
  return (
    <>
      <Modal active={modal}>
        <CreateAdvertisement />
      </Modal>
      <Modal active={chatModal}>
        <Chat />
      </Modal>
    </>
  );
};
export default React.memo(CarModals);
