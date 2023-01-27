import _ from 'lodash'
const Question = (props) => {
    const { data, index } = props
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            {data.image &&
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
            }
            <div className="question">Question {index}: {data.questionDescription} ?</div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answers${index}`}
                                className="answer-one">
                                <div class="form-check">
                                    <input className="form-check-input" type="checkbox" value="" />
                                    <label className="form-check-label" >
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question