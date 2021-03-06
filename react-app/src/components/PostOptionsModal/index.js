import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import PostOption from "./PostOption";

function PostOptionModal({post}) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal x={'x-out'} id={'modal-content-three'} onClose={() => setShowModal(false)}>
          <PostOption post={post} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PostOptionModal;
