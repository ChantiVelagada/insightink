import React from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, onConfirmDelete }) {
  const handleCloseModal = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          <div className={styles.modal}>
            <p>Are you sure you want to delete this post?</p>
            <div className={styles.modalButtons}>
              <button onClick={onClose}>Cancel</button>
              <button onClick={onConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
