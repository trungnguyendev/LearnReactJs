import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
const ManageUser = (props) => {
    const [ShowModelCreateUser, setShowModalCreateUser] = useState(false)
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new user</button>
                </div>
                <div className="table-users-container">
                    Table User
                </div>
                <ModalCreateUser show={ShowModelCreateUser}
                    setShow={setShowModalCreateUser} />
            </div>
        </div>
    )
}
export default ManageUser