import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface Props {
  children: React.ReactNode;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  isVisible: boolean;
};

const Modal: React.FC<Props> = ({
  closeModal,
  children,
  label,
  isVisible,
}) => {
  useEffect(() => {
    // close modal when user hits ESC key
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal(true);
      }
    };

    if (isVisible) {
      // stop scroll ability on page while modal is open
      document.body.style.overflow = 'hidden';
      // and add event listened for ESC key press
      window.addEventListener('keydown', (e) => close(e));
    } else {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', (e) => close(e));
    }
  }, [closeModal, isVisible]);

  return (
    <div
      aria-label={label}
      aria-modal="true"
      className={isVisible ? 'modal modal--is-visible' : 'modal'}
      role="dialog"
    >
      <div
        className="modal__background"
        // close when clicking outside modal card
        onClick={() => closeModal(true)}
      />
      <div className="modal__container">
        <FiX
          aria-label="Close modal"
          className="modal__close-icon"
          onClick={() => closeModal(true)}
          role="button"
          tabIndex={0}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;