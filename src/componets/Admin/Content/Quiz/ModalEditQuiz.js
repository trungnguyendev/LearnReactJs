import { putUpdateNewQuiz } from '../../../../services/apiService';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash'
const ModalEditQuiz = (props) => {
    const { show, setShow, dataEditQuiz, fetchQuiz } = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [PreviewImage, setPreviewImage] = useState("");
    const [type, setType] = useState('EASY')
    useEffect(() => {
        if (!_.isEmpty(dataEditQuiz)) {
            setName(dataEditQuiz.name)
            setDescription(dataEditQuiz.description)
            setType(dataEditQuiz.difficulty)
            setImage("")
            if (dataEditQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataEditQuiz.image}`)
            }
        }
    }, [dataEditQuiz])
    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }
    const handleClose = () => {
        setShow(false)
    }
    const handleSubmitEditQuiz = async () => {
        let data = await putUpdateNewQuiz(dataEditQuiz.id, description, name, type, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            fetchQuiz()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" value={description} onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type</label>
                            <select className="form-select" value={type} onChange={(event) => setType(event.target.value)}>
                                <option value='EASY'>EASY</option>
                                <option value='MEDIUM'>MEDIUM</option>
                                <option value='HARD'>HARD</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpLoad'>
                                Upload File Image</label>
                            <input type='file' id='labelUpLoad' hidden onChange={(event) => handleUpLoadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {PreviewImage ? <img src={PreviewImage} />
                                : <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitEditQuiz()} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditQuiz