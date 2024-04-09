import React from 'react';

import './Modal.css';
import { Button } from '../Button/Button';
import { Tooltip } from '../Tooltip/Tooltip';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalHeader: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  modalHeader,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-header">
        <Tooltip text="Here you can see the relation between charger, station and connectors">
          <div className="modal-header-text">{modalHeader}</div>
        </Tooltip>
        <Button
          customClass="modal-close-btn"
          onClick={onClose}
          aria-label="Modal close"
          btnLabel="Close"
        />
      </div>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
