import { useState } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { deleteQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDeleteQuiz, fetchQuiz } = props
    const handleClose = () => {
        setShow(false)
    }
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDeleteQuiz.id)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            fetchQuiz()
            handleClose()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete The Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz. id =
                    <b>
                        {dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalDeleteQuiz