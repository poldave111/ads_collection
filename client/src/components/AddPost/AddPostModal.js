import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMessageSuccess } from '../../redux/adsRedux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddPostModal(props) {
  const [show, setShow] = useState(props.show);

  const dispatch = useDispatch();

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleClose = () => {
    setShow(false);
    dispatch(setMessageSuccess(null));

  }



  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPostModal;