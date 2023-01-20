// import React, { useEffect, useState } from 'react'
// import './DisplayInfor.scss'
// import logo from './../logo.svg'
// class DisplayInfor extends React.Component {

//     render() {
//         const { listUser } = this.props
//         return (
//             <div className='display-infor-container'>
//                 {true &&
//                     <>
//                         {
//                             listUser.map((user) => {
//                                 return (
//                                     <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
//                                         <div>
//                                             <div>My name is {user.name}</div>
//                                             <div>Age is {user.age}</div>
//                                         </div>
//                                         <div>
//                                             <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                         </div>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </>
//                 }
//             </div>
//         )
//     }
// }
// const DisplayInfor = (props) => {
//     const { listUser } = props
//     const [ShowHideListUser, setShowHideListUser] = useState(true)
//     const handleShowHideListUser = () => {
//         setShowHideListUser(!ShowHideListUser)
//     }
//     useEffect(() => {
//         console.log('call me useEffect')
//     }, [listUser])
//     return (
//         <div className='display-infor-container'>
//             <div>
//                 <span onClick={() => handleShowHideListUser()}>{
//                     (ShowHideListUser) ? "hide" : "show"
//                 } list user:</span>
//             </div>
//             {ShowHideListUser &&
//                 <>
//                     {
//                         listUser.map((user) => {
//                             return (
//                                 <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
//                                     <div>
//                                         <div>My name is {user.name}</div>
//                                         <div>Age is {user.age}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </>
//             }
//         </div>
//     )
// }
// export default DisplayInfor