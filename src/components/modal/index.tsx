import React from 'react';

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
};

const Modal: React.FC<Props> = ({ children, isVisible }) => (
  <div className="modal" style={{ display: isVisible ? 'block' : 'none' }}>
    <div className="modal__background" />
    <div className="modal__container">
      {children}
    </div>
  </div>
);

export default Modal;