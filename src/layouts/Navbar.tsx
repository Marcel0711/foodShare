import { IoMdPizza, IoMdAdd, IoIosPerson, IoMdLogOut, IoMdLogIn } from 'react-icons/io'
import { Link, Outlet } from 'react-router-dom'
import useLogout from '../hooks/useLogout';
import useUserContext from '../hooks/useUserContext';

const Navbar = () => {
    const { user } = useUserContext()
    const { logout } = useLogout()
    
    return ( <>
        <header>
            <Link to='/'><h1 translate='no' className='logo'><IoMdPizza/>FoodShare</h1></Link>
            <div>
                {user && <>
                    <Link className='btn' to='/create'><IoMdAdd/>Add</Link>
                    <Link className='btn' to={`/profile/${user.username}`}><IoIosPerson/>Profile</Link>
                    <button className='btn' onClick={logout}><IoMdLogOut/>Log out</button>
                </>}
                {!user && <>
                    <Link to='/signup' className='btn'><IoMdLogIn/> Log in</Link>
                </>}
            </div>
        </header>
        <main>
            <Outlet/>
        </main>
        </>
     );
}
 
export default Navbar;