import React, { useState } from 'react'

// class AddUserInfor extends React.Component {
//     state = {
//         name: 'trung',
//         age: 19,
//         address: 'nam dinh'

//     }


//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }

//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault()
//         this.props.handleAddNewUser({
//             id: Math.floor(Math.random() * 100),
//             name: this.state.name,
//             age: this.state.age
//         })
//     }
//     render() {
//         return (
//             <>
//                 My name is {this.state.name} and I'm age {this.state.age}
//                 <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                     <label>Your name:</label>
//                     <input type="text"
//                         value={this.state.name}
//                         onChange={(event) => this.handleOnChangeInput(event)}
//                     />
//                     <label>Your age:</label>
//                     <input type="text"
//                         value={this.state.age}
//                         onChange={(event) => this.handleOnChangeAge(event)}
//                     />
//                     <button>Submit</button>
//                 </form>
//             </>
//         )
//     }
// }
// const AddUserInfor = (props) => {
//     const [name, setName] = useState("")
//     const [age, setAge] = useState("")
//     const [address, setAddress] = useState("")
//     const handleOnChangeInput = (event) => {
//         setName(event.target.value)
//     }

//     const handleOnChangeAge = (event) => {
//         setAge(event.target.value)
//     }

//     const handleOnSubmit = (event) => {
//         event.preventDefault()
//         props.handleAddNewUser({
//             id: Math.floor(Math.random() * 100),
//             name: name,
//             age: age
//         })
//     }
//     return (
//         <>
//             My name is {name} and I'm age {age}
//             <form onSubmit={(event) => handleOnSubmit(event)}>
//                 <label>Your name:</label>
//                 <input type="text"
//                     value={name}
//                     onChange={(event) => handleOnChangeInput(event)}
//                 />
//                 <label>Your age:</label>
//                 <input type="text"
//                     value={age}
//                     onChange={(event) => handleOnChangeAge(event)}
//                 />
//                 <button>Submit</button>
//             </form>
//         </>
//     )
// }
// export default AddUserInfor
