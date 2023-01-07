import React from 'react'

class DisplayInfor extends React.Component {
    state = {
        showListUser: true,
    }
    handleShowHide = (event) => {
        this.setState({
            showListUser: !this.state.showListUser,
        })
    }
    render() {
        const { listUser } = this.props
        return (
            <div>
                <div>
                    <span onClick={(event) => { this.handleShowHide(event) }}>
                        {(this.state.showListUser) ? "hide" : "show"} list user:
                    </span>
                </div>
                {this.state.showListUser &&
                    <div>
                        {
                            listUser.map((user) => {
                                return (
                                    <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
                                        {/* <div>My name is {this.props.name}</div>
                                        <div>Age is {this.props.age}</div> */}
                                        <div>My name is {user.name}</div>
                                        <div>Age is {user.age}</div>
                                    </div>

                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfor