import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import ViewFollower from "./ViewFollow";

function ViewFollowModal({user}) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal x={'x-out'} id={'modal-content-five'} onClose={() => setShowModal(false)}>
          <ViewFollower user={user} />
        </Modal>
      )}
    </>
  );
}

export default ViewFollowModal;
