// class components

// function components

// import React, { useState } from 'react'
// import DisplayInfor from './DisplayInfor'
// import AddUserInfor from './AddUserInfor'

// class MyComponent extends React.Component {
//     state = {
//         listUser: [
//             { id: 1, name: 'trung', age: 19 },
//             { id: 2, name: 'pro', age: 17 },
//             { id: 3, name: 'max', age: 30 }
//         ]
//     }
//     handleAddNewUser = (Object) => {
//         this.setState({
//             listUser: [Object, ...this.state.listUser]
//         })
//     }
//     handleDeleteUser = (userId) => {
//         let listUserClone = [...this.state.listUser]
//         listUserClone = listUserClone.filter(item => item.id !== userId)
//         this.setState({
//             listUser: listUserClone
//         })
//     }
//     // JSX
//     render() {
//         return (
//             <>
//                 <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//                 <p></p>
//                 <DisplayInfor
//                     listUser={this.state.listUser}
//                     handleDeleteUser={this.handleDeleteUser}
//                 />
//             </>
//         )
//     }

// }
// const MyComponent = (props) => {
//     const [listUser, setListUser] = useState([
//         { id: 1, name: 'trung', age: 19 },
//         { id: 2, name: 'pro', age: 17 },
//         { id: 3, name: 'max', age: 30 }
//     ])
//     const handleAddNewUser = (Object) => {
//         setListUser([Object, ...listUser])
//     }
//     const handleDeleteUser = (userId) => {
//         let listUserClone = [...listUser]
//         listUserClone = listUserClone.filter(item => item.id !== userId)
//         setListUser(listUserClone)
//     }
//     return (
//         <>
//             <AddUserInfor handleAddNewUser={handleAddNewUser} />
//             <p></p>
//             <DisplayInfor
//                 listUser={listUser}
//                 handleDeleteUser={handleDeleteUser}
//             />
//         </>
//     )
// }
// export default MyComponent