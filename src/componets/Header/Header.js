import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
const Header = () => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogOut = async () => {
        let res = await logout('account.email', account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout())
            navigate('/login')
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">Trung Dev</Navbar.Brand> */}
                <NavLink to="/" className='navbar-brand'>Trung Dev</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="user" className='nav-link'>User</NavLink>
                        <NavLink to="admin" className='nav-link'>Admin</NavLink>
                        {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/user">User</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link> */}
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>Log In</button>
                                <button className='btn-signup' onClick={() => handleRegister()} >Sign Up</button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;