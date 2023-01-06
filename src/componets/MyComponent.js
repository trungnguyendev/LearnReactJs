// class components

// function components

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

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
    }

    // JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm age {this.state.age}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }

}

export default MyComponent