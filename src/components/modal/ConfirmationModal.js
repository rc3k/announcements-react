import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import Trans from '../../Trans';

/**
 * @param {number} id
 * @param {boolean} show
 * @param {string} header
 * @param {string} content
 * @param {function} confirmHandler
 * @param {function} cancelHandler
 * @param {string} yes
 * @param {string} no
 * @param {string} noButtonClass
 * @returns {XML}
 */
const confirmationModal = (
  {
    id,
    show,
    header,
    content,
    yes,
    no,
    confirmHandler,
    cancelHandler,
    noButtonClass,
  },
) => (
  <Modal show={show} onHide={cancelHandler} id={id}>
    <Modal.Header>
      <Modal.Title>{header}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{content}</Modal.Body>
    <Modal.Footer>
      <Button className={noButtonClass} onClick={cancelHandler}>{no}</Button>
      <Button bsStyle="primary" onClick={confirmHandler}>{yes}</Button>
    </Modal.Footer>
  </Modal>
);

confirmationModal.defaultProps = {
  yes: Trans.yes,
  no: Trans.no,
};

export default confirmationModal;
