// class components

// function components

import React from 'react'
import DisplayInfor from './DisplayInfor'
import UserInfor from './UserInfor'

class MyComponent extends React.Component {
    state = {
        listUser: [
            { id: 1, name: 'trung', age: 19 },
            { id: 2, name: 'pro', age: 17 },
            { id: 3, name: 'max', age: 30 }
        ]
    }
    // JSX
    render() {
        return (
            <div>
                <UserInfor />
                <p></p>
                <DisplayInfor listUser={this.state.listUser} />
            </div>
        )
    }

}

export default MyComponent