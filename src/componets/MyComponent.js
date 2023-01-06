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
        console.log(this.state.age)

        this.setState({
            name: 'promax',
            age: Math.floor((Math.random() * 100 + 1))
        })
    }

    handleOnMouseOver(event) {
        //console.log(event.pageX)
    }

    // JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm age {this.state.age}
                <button onClick={(event) => { this.handleClick(event) }}>Click Me</button>
                <button onMouseOver={this.handleOnMouseOver}>Hover Me!</button>
            </div>
        )
    }

}

export default MyComponent