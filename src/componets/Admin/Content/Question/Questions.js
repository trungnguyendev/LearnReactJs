import { useState, useEffect } from "react";
import Select from "react-select"
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { RiImageAddFill } from "react-icons/ri"
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/apiService'
import { v4 as uuidv4 } from 'uuid'
import Lightbox from "react-awesome-lightbox";
import _ from 'lodash'
import './Questions.scss'
const Questions = (props) => {
    // const options = [
    //     { value: '', label: '' },
    //     { value: '', label: '' },
    //     { value: '', label: '' },
    // ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([])
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: 'questions 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answers 1',
                        isCorrect: false
                    }
                ]
            }
        ]
    )
    useEffect(() => {
        fetchQuiz()
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestions = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestions])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswers = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswers)
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }
    const handleOnChange = (type, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'QUESTION') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value
                setQuestions(questionsClone)
            }
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0]
            questionsClone[index].imageName = event.target.files[0].name
            setQuestions(questionsClone)
        }
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        questionsClone[index].answers.map(answer => {
            if (answer.id === answerId) {
                if (type === 'CHECKBOX') {
                    answer.isCorrect = value
                }
                if (type === 'ANSWER') {
                    answer.description = value
                }
            }
            return answer
        })
        setQuestions(questionsClone)

    }
    const handleSubmitQuestionForQuiz = async () => {
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(selectedQuiz.value, question.description, question.imageFile)
            await Promise.all(questions.answers.map(async (answer) => {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }))
        }))
    }
    const handlePreviewImage = (questionId) => {
        setIsPreviewImage(true)
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                title: questionsClone[index].imageName,
                url: URL.createObjectURL(questionsClone[index].imageFile)
            })
        }
    }
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group mb-2'>
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className="mt-3 mb-2">
                    Add questions:
                </div>
                {
                    questions && questions.length > 0 && questions.map((question, index) => {
                        return (
                            <div className="q-main mb-5" key={index.id}>
                                <div className="questions-content">
                                    <div className="form-floating description">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Password"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label >Question's {index + 1} Description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type={'file'}
                                            hidden
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        />
                                        <span>
                                            {question.imageName ?
                                                <span onClick={() => handlePreviewImage(question.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {question.imageName}</span> :
                                                '0 file is uploaded'
                                            }</span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className="icon-add" />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className="icon-remove" />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div className="answers-content" key={answer.id}>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answers-name">
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('ANSWER', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label >Answers {index + 1}</label>
                                                </div>
                                                <div className="btn-group">
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiOutlinePlusCircle className="icon-add" />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {isPreviewImage === true &&
                                    <Lightbox image={dataImagePreview.url}
                                        title={dataImagePreview.title}
                                        onClose={() => setIsPreviewImage(false)}
                                    >
                                    </Lightbox>
                                }
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            className="btn btn-warning"
                            onClick={() => handleSubmitQuestionForQuiz()}
                        >Save Questions</button>
                    </div>
                }
            </div>

        </div>
    )
}
export default Questions