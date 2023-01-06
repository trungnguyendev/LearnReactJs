// class components
// function component

import React from 'react'

class MyComponent extends React.Component {

    state = {
        name: 'trung',
        age: 19,
        address: 'nam dinh'
    }

    handleClick(event) {
        // console.log("Click Me!")
        // console.log(event)
        // console.log(event.target)
        console.log(this.state.name)
    }

    handleOnMouseOver(event) {
        console.log(event.pageX)
    }

    // JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
                <button onClick={this.handleClick}>Click Me</button>
                <button onMouseOver={this.handleOnMouseOver}>Hover Me!</button>
            </div>
        )
    }

}

export default MyComponent