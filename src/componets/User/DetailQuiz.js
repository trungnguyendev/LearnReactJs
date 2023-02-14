import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService"
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question"
import { useState } from "react"
import ModalResult from "./ModalResult"
import RightContent from "./Content/RightContent"
const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    useEffect(() => {
        fetchQuestions()
    }, [quizId])
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let questionDescription, image = null;
                    let answers = []
                    value.forEach((item, index) => {
                        item.answers.isSelected = false
                        answers.push(item.answers)

                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                    })
                    return { questionId: key, answers: answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data)
        }
    }
    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.map(question => {
                let questionId = question.questionId
                let userAnswerId = []
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers
            let res = await postSubmitQuiz(payload)
            if (res && res.EC === 0) {
                setIsShowModalResult(true)
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
            } else {

            }
        }
    }
    const handleCheckBoxx = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
        }
        let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-center">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckBoxx={handleCheckBoxx}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleFinishQuiz()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}
export default DetailQuiz