import avatar from '../assets/avatar.jpg'
import type { User } from "../types";
import DeleteUser from './DeleteUser';

type Props = {
    user: User
    allowEdit?: boolean
}

const UserBox = ({user, allowEdit}:Props) => {

    return ( 
        <div className='user-box'>
            <div className='user-box__avatar'>
                <h3>{user.username}</h3>
                <img src={user.avatar || avatar}/>
            </div>
            {allowEdit && <>
                <DeleteUser className='user-box__btn'/>
            </>}
        </div>
     );
}
 
export default UserBox;