import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataView, setDataView] = useState({})
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
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true)
        setDataView(user)
    }
    const resetUpdateData = () => {
        setDataUpdate({})
    }
    const resetViewData = () => {
        setDataView({})
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
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView} />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers} />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData} />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetViewData={resetViewData} />
            </div>
        </div>
    )
}
export default ManageUser