import { useState } from 'react'
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { postRegister } from "../../services/apiService"
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from '../Header/Language';
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleRegister = async () => {
        const isValidateEmail = validateEmail(email)
        if (!isValidateEmail) {
            toast.error('Invalid email')
            return;
        }
        if (!password) {
            toast.error("Invalid password")
            return;
        }
        let data = await postRegister(email, username, password)
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <div className='register-container'>
            <div className='header'>
                <span>Already have an account ?</span>
                <button onClick={() => navigate('/login')}>Log in</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                Trung Dev
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this ?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={"email"}
                        value={email}
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input type={"text"}
                        value={username}
                        className="form-control"
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type={isShowPassword ? "password" : "text"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    {isShowPassword ?
                        <span className='icons-eye' onClick={() => setIsShowPassword(true)} >
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye' onClick={() => setIsShowPassword(false)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                {/* <span className='forgot-password'>Forgot password?</span> */}
                <div>
                    <button className='btn-submit' onClick={() => handleRegister()}>Sign up Trung Dev</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}>Go to HomePage</span>
                </div>
            </div>
        </div>
    )
}
export default Register