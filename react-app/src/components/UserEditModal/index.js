import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UserEditForm from './UserEditForm'

function UserEditModal() {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserEditForm />
        </Modal>
      )}
    </>
  );
}

export default UserEditModal;
