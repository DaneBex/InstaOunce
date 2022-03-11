import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ViewPost from "./ViewPost";

function ViewPostModal({user_post_id, post}) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal closeOn={'close-two'} x={'x-out-two'} id={'modal-content'} onClose={() => setShowModal(false)}>
          <ViewPost user_post_id={user_post_id}  post={post} />
        </Modal>
      )}
    </>
  );
}

export default ViewPostModal;
