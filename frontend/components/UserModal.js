
import { Modal} from 'react-bootstrap';
import PropTypes from "prop-types";

const UserModal = ({ show, handleClose}) => {
  
    return (
      <>
        <Modal 
         show={show} 
         onHide={handleClose}
         aria-labelledby="contained-modal-title-vcenter"
         centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button variant="primary" onClick={handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

UserModal.protoTypes = {
    // type: PropTypes.string,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    handleShow: PropTypes.func
}
export default UserModal;