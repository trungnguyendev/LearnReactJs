// class components
// function component

import React from 'react'

class MyComponent extends React.Component {

    state = {
        name: 'trung',
        age: 19,
        address: 'nam dinh'
    }
    // JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
            </div>
        )
    }

}

export default MyComponent