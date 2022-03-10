import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ViewPost from "./ViewPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";

function ViewPostModal({post}) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal x={'x-out-two'} id={'modal-content'} onClose={() => setShowModal(false)}>
          <ViewPost post={post} />
        </Modal>
      )}
    </>
  );
}

export default ViewPostModal;
