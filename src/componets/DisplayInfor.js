import React from 'react'

class DisplayInfor extends React.Component {
    render() {
        const { listUser } = this.props
        return (
            <div>
                {
                    listUser.map((user) => {
                        console.log(user)
                        return (
                            <div key={user.id}>
                                {/* <div>My name is {this.props.name}</div>
                                <div>Age is {this.props.age}</div> */}
                                <div>My name is {user.name}</div>
                                <div>Age is {user.age}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default DisplayInfor