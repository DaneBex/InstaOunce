import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faBan, faX } from '@fortawesome/free-solid-svg-icons'

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({x, id, onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <FontAwesomeIcon id={x} icon={faX} onClick={onClose} />
      <div id={id}>{children}</div>
    </div>,
    modalNode
  );
}
