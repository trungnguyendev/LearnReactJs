import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDataQuiz } from "../../services/apiService"
import _ from 'lodash'
const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
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
        }
    }
    return (
        <div className="detail-quiz-container">
            Detail Quiz
        </div>
    )
}
export default DetailQuiz