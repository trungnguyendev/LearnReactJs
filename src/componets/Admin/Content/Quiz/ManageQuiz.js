import './ManageQuiz.scss'
import Select from 'react-select'
import { useState } from 'react';
import { postCreateNewQuiz, getAllQuizForAdmin } from '../../../../services/apiService'
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import { useEffect } from 'react';
import ModalEditQuiz from './ModalEditQuiz';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
    const [showModalEditQuiz, setShowModalEditQuiz] = useState(false)
    const [dataEditQuiz, setDataEditQuiz] = useState({})
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        console.log(res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setDescription('')
            setName('')
            setImage(null)
            fetchQuiz()
        } else {
            toast.error(res.EM)
        }
    }
    useEffect(() => {
        fetchQuiz()
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    const handleClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true)
        setDataDeleteQuiz(quiz)
    }
    const handleClickBtnEdit = (quiz) => {
        setShowModalEditQuiz(true)
        setDataEditQuiz(quiz)
    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header> Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset class="border rounded-3 p-3">
                                <legend class="float-none w-auto px-3 ">Add new user:</legend>
                                <div class="form-floating mb-3">
                                    <input type="email"
                                        class="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label for="floatingInput">Name</label>
                                </div>
                                <div class="form-floating">
                                    <input type="text"
                                        class="form-control"
                                        placeholder="Password"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={'Quiz type'}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input type='file'
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div>
                                    <button className='btn btn-warning mt-3'
                                        onClick={() => handleSubmitQuiz()}
                                    >Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail">
                <TableQuiz
                    listQuiz={listQuiz}
                    handleClickBtnDelete={handleClickBtnDelete}
                    handleClickBtnEdit={handleClickBtnEdit}
                />
                <ModalDeleteQuiz
                    show={showModalDeleteQuiz}
                    setShow={setShowModalDeleteQuiz}
                    dataDeleteQuiz={dataDeleteQuiz}
                    fetchQuiz={fetchQuiz}
                />
                <ModalEditQuiz
                    show={showModalEditQuiz}
                    setShow={setShowModalEditQuiz}
                    dataEditQuiz={dataEditQuiz}
                    fetchQuiz={fetchQuiz}
                />
            </div>
        </div>
    )
}
export default ManageQuiz