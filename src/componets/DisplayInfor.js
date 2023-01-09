import React from 'react'
import './DisplayInfor.scss'
import logo from './../logo.svg'
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
            <div className='display-infor-container'>
                {/* <img src={logo} /> */}
                <div>
                    <span onClick={(event) => { this.handleShowHide(event) }}>
                        {(this.state.showListUser) ? "hide" : "show"} list user:
                    </span>
                </div>
                {this.state.showListUser &&
                    <>
                        {
                            listUser.map((user) => {
                                return (
                                    <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
                                        <div>
                                            <div>My name is {user.name}</div>
                                            <div>Age is {user.age}</div>
                                        </div>
                                        <div>
                                            <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                }
            </div>
        )
    }
}

export default DisplayInfor