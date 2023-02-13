import { useState, useEffect } from "react";
import Select from "react-select"
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { RiImageAddFill } from "react-icons/ri"
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, getQuizWithQA } from '../../../../services/apiService'
import { v4 as uuidv4 } from 'uuid'
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import _ from 'lodash'
import './QuizQA.scss'
const QuizQA = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([])
    const initQuestion = [
        {
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
    ]
    const [questions, setQuestions] = useState(initQuestion)
    useEffect(() => {
        fetchQuiz()
    }, [])
    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA()
        }
    }, [selectedQuiz])
    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
                }
                newQA.push(q)
            }
            setQuestions(newQA)
        }
        function urltoFile(url, filename, mimeType) {
            return (fetch(url)
                .then(function (res) { return res.arrayBuffer(); })
                .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
            );
        }

        urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt', 'text/plain')
            .then(function (file) { console.log(file); });
    }
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
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!')
            return;
        }
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexA = j
                    break
                }
            }
            if (isValidAnswer === false) {
                indexQ = i
                break
            }
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty answer ${indexA + 1} at question ${indexQ + 1}`)
            return
        }
        let isValidQuestion = true
        let indexQuestion = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false
                indexQuestion = i
                break
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty description at question ${indexQuestion + 1}`)
            return
        }
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile)
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }
        }
        toast.success('Create questions and answers succced')
        setQuestions(initQuestion)
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
export default QuizQA