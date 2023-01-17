import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
const ManageUser = (props) => {
    const [showModelCreateUser, setShowModalCreateUser] = useState(false)
    const [showModelUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [listUsers, setlistUsers] = useState([])
    useEffect(() => {
        fetchListUsers()
    }, [])
    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setlistUsers(res.DT)
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }
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
                    <TableUser listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate} />
                </div>
                <ModalCreateUser
                    show={showModelCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers} />
                <ModalUpdateUser
                    show={showModelUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate} />
            </div>
        </div>
    )
}
export default ManageUser