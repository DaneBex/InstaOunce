import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import EditPost from "./EditPost";

function EditPostModal({post}) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal closeOn={'close-two'} x={'x-out'} id={'modal-content-three'} onClose={() => setShowModal(false)}>
          <EditPost post={post} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
