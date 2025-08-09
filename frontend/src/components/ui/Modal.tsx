/**
 * Modal component
 */

import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from './Button';

const CustomModal = ({
  isOpen,
  onClose,
  title = '',
  children,
  size = 'md',
  footer,
  closeButton = true,
  backdrop = true,
  keyboard = true,
  className = '',
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27 && keyboard) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, keyboard, onClose]);

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size={size}
      backdrop={backdrop}
      keyboard={keyboard}
      className={className}
      centered
    >
      {title && (
        <Modal.Header closeButton={closeButton}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>
        {children}
      </Modal.Body>

      {footer && (
        <Modal.Footer>
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
};

// Pre-configured modals
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
}) => {
  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        {cancelText}
      </Button>
      <Button variant={variant} onClick={onConfirm}>
        {confirmText}
      </Button>
    </>
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="sm"
    >
      <p>{message}</p>
    </CustomModal>
  );
};

export const AlertModal = ({
  isOpen,
  onClose,
  title = 'Information',
  message = '',
  variant = 'primary',
  buttonText = 'OK',
}) => {
  const footer = (
    <Button variant={variant} onClick={onClose}>
      {buttonText}
    </Button>
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="sm"
    >
      <p>{message}</p>
    </CustomModal>
  );
};

export default CustomModal;
