import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiService"
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question"
import { useState } from "react"
const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
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
        if (dataQuiz && dataQuiz.length > index)
            setIndex(index + 1)
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
                    <Question index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    <button className="btn btn-primary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-secondary" onClick={() => handleNext()}>Next</button>
                </div>
            </div>
            <div className="right-content">
                right-content
            </div>
        </div>
    )
}
export default DetailQuiz