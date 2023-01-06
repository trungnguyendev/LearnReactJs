import React from 'react'

class DisplayInfor extends React.Component {
    render() {
        const { name, age } = this.props
        return (
            <div>
                {/* <div>My name is {this.props.name}</div>
                <div>Age is {this.props.age}</div>  */}
                <div>My name is {name}</div>
                <div>Age is {age}</div>
            </div>
        )
    }
}

export default DisplayInfor