import CountDown from "./CountDown"

const RightContent = (props) => {
    const { dataQuiz } = props
    const setTimeUp = () => {
        props.handleFinishQuiz()
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
                            <div key={index} className="question">{index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default RightContent