import './UserEdit.css'
import {useState} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { editUser } from '../../store/user';


const UserEdit = ()=>{
    const user = useSelector(state => state.session.user)
    const [username, setUsername] = useState(user.username);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (e) =>{
        e.preventDefault()
        if(username){
            dispatch(editUser(user.id, username))
            history.push(`/users/${user.id}`)
    window.location.reload(false);
        }
    }

    return(
        <div className='edit-user-container'>
            <div className='edit-user-form-container'>
                <h1>Edit Your Profile!</h1>
                <img className='user-profile-pic' src={user.profile_pic}/>
                <form className='user-edit-form' onSubmit={handleClick}>
                    <div className="edit-user-input-container">
                        <p className='edit-form-label'>Update Username</p>
                        <input type="text" className='edit-username' value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                    <button className='edit-user-btn' type='submit'>Edit</button>
                </form>

            </div>
        </div>
    )
}

export default UserEdit;