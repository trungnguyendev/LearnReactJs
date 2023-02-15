import { useRef } from "react"
import CountDown from "./CountDown"

const RightContent = (props) => {
    const { dataQuiz, setIndex } = props
    const refDiv = useRef([])
    const setTimeUp = () => {
        props.handleFinishQuiz()
    }
    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isAnswers = question.answers.find(a => a.isSelected === true)
            if (isAnswers) {
                return "question selected"
            }
        }
        return "question"
    }
    const handleClickQuestion = (question, index) => {
        setIndex(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswers = question.answers.find(a => a.isSelected === true)
            if (isAnswers) {
                return
            }
        }
        refDiv.current[index].className = "question clicked"
    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    setTimeUp={setTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={index} className={getClassQuestion(item)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default RightContent