import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CommentOption from "./CommentOptionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";

function CommentOptionModal({post, comment}) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal x={'x-out'} id={'modal-content-four'} onClose={() => setShowModal(false)}>
          <CommentOption post={post} comment={comment} />
        </Modal>
      )}
    </>
  );
}

export default CommentOptionModal;
