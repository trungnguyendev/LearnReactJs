// class components

// function components

import React from 'react'
import DisplayInfor from './DisplayInfor'
import UserInfor from './UserInfor'

class MyComponent extends React.Component {

    // JSX
    render() {
        return (
            <div>
                <UserInfor />
                <p></p>
                <DisplayInfor name='trung' age='19' />
            </div>
        )
    }

}

export default MyComponent