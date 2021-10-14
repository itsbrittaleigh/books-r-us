import React from 'react';
import Modal from './Modal';

interface Props {
  deleteBook: () => void,
  display: boolean,
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const DeleteModal: React.FC<Props> = ({
  deleteBook,
  display,
  setDisplay,
  title,
}) => (
  <Modal
    closeModal={() => setDisplay(false)}
    label="delete"
    isVisible={display}
  >
    <p
      style={{
        textAlign: 'center',
        marginBottom: '60px',
      }}
    >
      Are you sure you want to delete {title}?
    </p>
    <div className="button__container--right">
      <button
        className="button--link"
        onClick={() => setDisplay(false)}
      >
        Cancel
      </button>
      <button
        className="button button--delete"
        onClick={deleteBook}
      >
        Delete
      </button>
    </div>
  </Modal>
);

export default DeleteModal;
