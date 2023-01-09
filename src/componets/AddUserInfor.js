import React from 'react'

class AddUserInfor extends React.Component {
    state = {
        name: 'trung',
        age: 19,
        address: 'nam dinh'

    }


    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.handleAddNewUser({
            name: this.state.name,
            age: this.state.age
        })
    }
    render() {
        return (
            <>
                My name is {this.state.name} and I'm age {this.state.age}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label>Your name:</label>
                    <input type="text"
                        //placeholder='name'
                        value={this.state.name}
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <label>Your age:</label>
                    <input type="text"
                        //placeholder='name'
                        value={this.state.age}
                        onChange={(event) => this.handleOnChangeAge(event)}
                    />
                    <button>Submit</button>
                </form>
            </>
        )
    }
}

export default AddUserInfor
