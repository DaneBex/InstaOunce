import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function PostFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} id="create-post-button">
        <FontAwesomeIcon id="create-post-icon" icon={faSquarePlus} />
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm />
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;
