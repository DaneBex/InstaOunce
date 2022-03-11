import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import ViewFollowing from "./ViewFollowing";

function ViewFollowingModal({user}) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <Modal x={'x-out'} id={'modal-content-five'} onClose={() => setShowModal(false)}>
          <ViewFollowing user={user} />
        </Modal>
      )}
    </>
  );
}

export default ViewFollowingModal;
