import { useState } from "react";
import Select from "react-select"
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import './Questions.scss'
const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
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
                        options={options}
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
                                        />
                                        <label >Question's {index + 1} Description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input type={'file'} hidden />
                                        <span>0 file is uploaded</span>
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
                                                />
                                                <div className="form-floating answers-name">
                                                    <input type="text"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        value={answer.description}
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

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Questions